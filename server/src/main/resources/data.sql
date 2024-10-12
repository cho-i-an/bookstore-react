DELETE FROM book;
ALTER TABLE book AUTO_INCREMENT = 1001;

DELETE FROM category;
ALTER TABLE category AUTO_INCREMENT = 1001;

INSERT INTO `category` (`name`) VALUES ('Adventure'),('Literary'),('Business'),('YoungAdult'),('Fantasy'),('Romance'),('Mystery'),('Health');

# Adventure
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Secret Zoo', 'Bryan Chick', '', 6.99, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('A Trail Through Time', 'Jodi Taylor', '', 7.99, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Percy Jackson and the Olympians: The Chalice of the Gods', 'Rick Riordan', '', 5.99, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Legend of the Star Runner', 'J I Wagner', '', 6.659, 0, FALSE, FALSE, 1001);

# Literary
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('We Must Not Think of Ourselves', 'Lauren Grodstein', '', 11.59, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('In an Instant', 'Suzanne Redfearn', '', 25.64, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Beyond That, the Sea', 'Lauren Grodstein', '', 3.9, 0, FALSE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Last of the Moon Girls', 'Barbara Davis', '', 6.00, 0, TRUE, FALSE, 1002);

# Business
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Think and Grow Rich', 'Napoleon Hill', '', 12.59, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The ChatGPT Millionaire', 'Neil Dagger', '', 7.99, 0, FALSE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('LLC Beginners Guide', 'Steven Carlson', '', 5.99, 0, FALSE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('How to Win Friends & Influence People', 'Dale Carnegie', '', 6.99, 0, TRUE, FALSE, 1003);

# YoungAdult
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Words We Keep', 'Erin Stewart', '',7.99, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Just Mercy', 'Bryan Stevenson', '', 2.99, 0, FALSE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('One of Us Is Lying', 'Karen M. McManus', '', 12.99, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Bones & All', 'Camille Deangelis', '',15, 0, TRUE, FALSE, 1004);

# Fantasy
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Girl Who Looked Beyond The Stars', 'L. B. Anne', '',7.99, 0, FALSE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('House in the Cerulean Sea', 'TJ Klune', '', 2.99, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Girl Who Drank the Moon', 'Kelly Barnhill', '', 12.99, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Shadow of the Gods', 'John Gwynne', '',15, 0, FALSE, FALSE, 1005);

# Romance
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Twisted Love (Twisted, 1)', 'Ana Huang', '',7.99, 0, TRUE, FALSE, 1006);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Love and Other Words', 'Christina Lauren', '', 2.99, 0, FALSE, FALSE, 1006);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('King of Wrath', 'Ana Huang', '', 12.99, 0, TRUE, FALSE, 1006);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Flawless', 'Elsie Silver', '',15, 0, FALSE, FALSE, 1006);

# Mystery
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Never Lie', 'Freida McFadden', '',7.99, 0, TRUE, FALSE, 1007);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Then She Was Gone', 'Lisa Jewell', '', 2.99, 0, FALSE, FALSE, 1007);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('I Am Watching You', 'Teresa Driscoll', '', 12.99, 0, FALSE, FALSE, 1007);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('A Good Girls Guide to Murder', 'Holly Jackson', '',15, 0, TRUE, FALSE, 1007);

# Health
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Juicing for Beginners', 'Callisto Publishing', '',7.99, 0, FALSE, FALSE, 1008);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Ditch the Diet', 'Oonagh Duncan', '', 2.99, 0, TRUE, FALSE, 1008);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Gut', 'Giulia Enders', '', 12.99, 0, TRUE, FALSE, 1008);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Mind-Gut Connection', 'Emeran Mayer', '',15, 0, FALSE, FALSE, 1008);