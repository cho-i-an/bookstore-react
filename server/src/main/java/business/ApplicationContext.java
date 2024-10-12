
package business;

import business.book.BookDao;
import business.book.BookDaoJdbc;
import business.cart.ShoppingCart;
import business.category.CategoryDao;
import business.category.CategoryDaoJdbc;
import business.customer.CustomerDao;
import business.customer.CustomerDaoJdbc;
import business.customer.CustomerForm;
import business.order.*;

public class ApplicationContext {

    // TODO Add field and complete the getter for bookDao
    private OrderDao orderDao;
    private LineItemDao lineItemDao;
    private CustomerDao customerDao;

    private CustomerForm customerForm;
    private ShoppingCart shoppingCart;
    private CategoryDao categoryDao;
    private BookDao bookDao;
    private OrderService orderService;

    public static ApplicationContext INSTANCE = new ApplicationContext();

    private ApplicationContext() {
        orderService = new DefaultOrderService();
        orderDao = new OrderDaoJdbc();
        lineItemDao = new LineItemDaoJdbc();
        customerDao = new CustomerDaoJdbc();
        categoryDao = new CategoryDaoJdbc();
        bookDao = new BookDaoJdbc();


        customerForm = new CustomerForm();
        shoppingCart = new ShoppingCart();




        ((DefaultOrderService)orderService).setBookDao(bookDao);

        ((DefaultOrderService)orderService).setOrderDao(orderDao);
        ((DefaultOrderService)orderService).setLineItemDao(lineItemDao);
        ((DefaultOrderService)orderService).setCustomerDao(customerDao);
        ((DefaultOrderService)orderService).setBookDao(bookDao);
    }


    public CustomerForm getCustomerForm(){
        return customerForm;
    }
    public ShoppingCart getShoppingCart(){
        return shoppingCart;
    }
    public OrderDao getOrderDao() {
        return orderDao;
    }

    public LineItemDao getLineItemDao() {
        return lineItemDao;
    }


    public CustomerDao getCustomerDao() {
        return customerDao;
    }


    public CategoryDao getCategoryDao() {
        return categoryDao;
    }

    public BookDao getBookDao() { return bookDao; }

    public OrderService getOrderService() {
        return orderService;
    }
}
