-- DROP DATABASE IF EXISTS yl_forum;
-- CREATE DATABASE yl_forum;

CREATE TABLE IF NOT EXISTS `user` (          
    id varchar(100) NOT NULL UNIQUE,
    name varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    bio varchar(255),
    date date,
    follows int  default 0,
    followers int  default 0,
    ubication varchar(255),
    profile varchar(255),
    banner varchar(255),                              
    pass varchar(555) NOT NULL,
    role int(1) default 0,
    PRIMARY KEY (id)          
);



CREATE TABLE IF NOT EXISTS topic(              
    id varchar(100) NOT NULL UNIQUE,
    title varchar(255) NOT NULL UNIQUE,
    description varchar(255),
    subscribers int default 0,
    date date,    
    image  varchar(255),
    banner varchar(255),                              
    creator varchar(100) NOT NULL,  
    FOREIGN KEY (creator) REFERENCES user(id), 
    PRIMARY KEY (id)
);



CREATE TABLE IF NOT EXISTS post(  
    id varchar(100) NOT NULL UNIQUE,        
    user_id varchar(100) NOT NULL,
    topic_id varchar(100) not NULL,
    date date,
    text varchar(1000),
    likes int default 0,
    FOREIGN KEY (user_id) references user(id),
    FOREIGN KEY (topic_id) references topic(id),
    PRIMARY KEY (id)          
);

CREATE TABLE IF NOT EXISTS comment(  
    id varchar(100) NOT NULL UNIQUE,        
    user_id varchar(100) NOT NULL,
    post_id varchar(100) default NULL,   
    comment_id varchar(100) default NULL,
    text varchar(1000),
    FOREIGN KEY (user_id) references user(id),
    -- FOREIGN KEY (post_id) references post(id),
    -- FOREIGN KEY (comment_id) references comment(id),
    PRIMARY KEY (id)          
);



-- RELATIONSHIPS
CREATE TABLE IF NOT EXISTS follows(          
    user_id varchar(100) NOT NULL,
    followed_id varchar(100) NOT NULL,
    FOREIGN KEY (user_id) references user(id),
    FOREIGN KEY (followed_id) references user(id),
    PRIMARY KEY (user_id,followed_id)          
);

CREATE TABLE IF NOT EXISTS subscription(          
    user_id varchar(100) NOT NULL,
    topic_id varchar(100) NOT NULL,
    FOREIGN KEY (user_id) references user(id),
    FOREIGN KEY (topic_id) references topic(id),
    PRIMARY KEY (user_id,topic_id)          
);

CREATE TABLE IF NOT EXISTS friendship(          
    user_id varchar(100) NOT NULL,
    friend_id varchar(100) NOT NULL,
    accepted boolean default false,
    FOREIGN KEY (user_id) references user(id),
    FOREIGN KEY (friend_id) references user(id),
    PRIMARY KEY (user_id,friend_id)          
);


