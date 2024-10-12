package business.order;

import api.ApiException;
import business.BookstoreDbException;
import business.JdbcUtils;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.Customer;
import business.customer.CustomerDao;
import business.customer.CustomerForm;

import java.sql.Connection;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class DefaultOrderService implements OrderService {

    private OrderDao orderDao;
    private LineItemDao lineItemDao;
    private CustomerDao customerDao;
    private BookDao bookDao;

    public void setBookDao(BookDao bookDao) {
        this.bookDao = bookDao;
    }

    public void setOrderDao(OrderDao orderDao) {
        this.orderDao = orderDao;
    }

    public void setLineItemDao(LineItemDao lineItemDao) {
        this.lineItemDao = lineItemDao;
    }

    public void setCustomerDao(CustomerDao customerDao) {
        this.customerDao = customerDao;
    }

    @Override
    public OrderDetails getOrderDetails(long orderId) {
        Order order = orderDao.findByOrderId(orderId);
        Customer customer = customerDao.findByCustomerId(order.customerId());
        List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
        List<Book> books = lineItems
                .stream()
                .map(lineItem -> bookDao.findByBookId(lineItem.bookId()))
                .toList();
        return new OrderDetails(order, customer, lineItems, books);
    }

    private long performPlaceOrderTransaction(
            String name, String address, String phone,
            String email, String ccNumber, Date date,
            ShoppingCart cart, Connection connection) {
        try {
            connection.setAutoCommit(false);
            long customerId = customerDao.create(
                    connection, name, address, phone, email,
                    ccNumber, date);
            long customerOrderId = orderDao.create(
                    connection,
                    cart.getComputedSubtotal() + cart.getSurcharge(),
                    generateConfirmationNumber(), customerId);
            for (ShoppingCartItem item : cart.getItems()) {
                lineItemDao.create(connection, customerOrderId,
                        item.getBookId(), item.getQuantity());
            }
            connection.commit();
            return customerOrderId;
        } catch (Exception e) {
            try {
                connection.rollback();
            } catch (SQLException e1) {
                throw new BookstoreDbException("Failed to roll back transaction", e1);
            }
            return 0;
        }
    }

    private int generateConfirmationNumber() {
        return ThreadLocalRandom.current().nextInt(999999999);
    }
    @Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

        validateCustomer(customerForm);
        validateCart(cart);

        try (Connection connection = JdbcUtils.getConnection()) {
            Date ccExpDate = getCardExpirationDate(
                    customerForm.getCcExpiryMonth(),
                    customerForm.getCcExpiryYear());
            return performPlaceOrderTransaction(
                    customerForm.getName(),
                    customerForm.getAddress(),
                    customerForm.getPhone(),
                    customerForm.getEmail(),
                    customerForm.getCcNumber(),
                    ccExpDate, cart, connection);
        } catch (SQLException e) {
            throw new BookstoreDbException("Error during close connection for customer order", e);
        }

//        // NOTE: MORE CODE PROVIDED NEXT PROJECT
//
//        return -1;
    }

    private Date getCardExpirationDate(String monthString, String yearString) {

        String dateString = yearString + "-" + monthString + "-" + "01";

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date date = dateFormat.parse(dateString);
            return date;
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }


    private void validateCustomer(CustomerForm customerForm) {
        // Name validation
        if (customerForm.getName() == null) {
            throw new ApiException.ValidationFailure("name", "Name is required.");
        } else if (customerForm.getName().isEmpty()) {
            throw new ApiException.ValidationFailure("name", "Name cannot be empty.");
        } else if (customerForm.getName().length() < 4 || customerForm.getName().length() > 45) {
            throw new ApiException.ValidationFailure("name", "Invalid name.");
        }


        // Address validation
        if (customerForm.getAddress() == null) {
            throw new ApiException.ValidationFailure("address", "Address is required.");
        } else if (customerForm.getAddress().isEmpty()) {
            throw new ApiException.ValidationFailure("address", "Address cannot be empty.");
        } else if (customerForm.getAddress().length() < 4 || customerForm.getAddress().length() > 45) {
            throw new ApiException.ValidationFailure("address", "Invalid address.");
        }

        // Phone validation
        if (customerForm.getPhone() == null) {
            throw new ApiException.ValidationFailure("phone", "Phone number is required.");
        } else {
            String phoneDigits = customerForm.getPhone().replaceAll("\\D+", "");
            if (phoneDigits.isEmpty()) {
                throw new ApiException.ValidationFailure("phone", "Phone number cannot be empty.");
            } else if (phoneDigits.length() != 10) {
                throw new ApiException.ValidationFailure("phone", "Invalid phone number.");
            }
        }

        // Email validation
        if (customerForm.getEmail() == null) {
            throw new ApiException.ValidationFailure("email", "Email address is required.");
        } else if (customerForm.getEmail().isEmpty()) {
            throw new ApiException.ValidationFailure("email", "Email address cannot be empty.");
        } else if (!customerForm.getEmail().contains("@") || customerForm.getEmail().endsWith(".") || customerForm.getEmail().contains(" ")) {
            throw new ApiException.ValidationFailure("email", "Invalid email address.");
        }

        // Credit Card Number validation
        if (customerForm.getCcNumber() == null) {
            throw new ApiException.ValidationFailure("ccNumber", "Credit card number is required.");
        } else {
            String ccNumberDigits = customerForm.getCcNumber().replaceAll("\\D+", "");
            if (ccNumberDigits.isEmpty()) {
                throw new ApiException.ValidationFailure("ccNumber", "Credit card number cannot be empty.");
            } else if (ccNumberDigits.length() < 14 || ccNumberDigits.length() > 16) {
                throw new ApiException.ValidationFailure("ccNumber", "Invalid credit card number.");
            }
        }

        // Expiration Date validation
        if (customerForm.getCcExpiryMonth() == null || customerForm.getCcExpiryYear() == null) {
            throw new ApiException.ValidationFailure("Invalid expiration date. ");
        } else if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
            throw new ApiException.ValidationFailure("Invalid expiration date. ");
        }
    }

    private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {
        // TODO: return true when the provided month/year is before the current month/yeaR
        // HINT: Use Integer.parseInt and the YearMonth class
        try {
            int expiryYear = Integer.parseInt(ccExpiryYear);
            int expiryMonth = Integer.parseInt(ccExpiryMonth);
            YearMonth currentYearMonth = YearMonth.now();
            YearMonth expiryYearMonth = YearMonth.of(expiryYear, expiryMonth);
            return expiryYearMonth.isBefore(currentYearMonth);
        } catch (NumberFormatException | DateTimeException e) {
            return true;
        }
    }

    private void validateCart(ShoppingCart cart) {

        if (cart.getItems().isEmpty()) {
            throw new ApiException.ValidationFailure("Cart is empty.");
        }

        for (ShoppingCartItem item : cart.getItems()) {
            // Quantity validation
            if (item.getQuantity() < 1 || item.getQuantity() > 99) {
                throw new ApiException.ValidationFailure("Invalid quantity for item with book ID " + item.getBookId());
            }

            // Fetch book details from the database
            Book databaseBook = bookDao.findByBookId(item.getBookId());
            if (databaseBook == null) {
                throw new ApiException.ValidationFailure("Book with ID " + item.getBookId() + " not found in database.");
            }

            // Price validation
            if (databaseBook.price() != item.getBookForm().getPrice()) {
                throw new ApiException.ValidationFailure("Incorrect price for book with ID " + item.getBookId());
            }

            // Category validation
            if (databaseBook.categoryId() != item.getBookForm().getCategoryId()) {
                throw new ApiException.ValidationFailure("Incorrect category for book with ID " + item.getBookId());
            }
        }
    }



}
