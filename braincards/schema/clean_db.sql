-- DROP TABLE IF EXISTS USER;
-- DROP TABLE IF EXISTS CARD;
-- DROP TABLE IF EXISTS DECK;

delete from card;

insert into card (deck_id, front_content, back_content)
values (3, 'What is Java?', 'Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is a general-purpose programming language intended to let application developers write once, run anywhere (WORA), meaning that compiled Java code can run on all platforms that support Java without the need for recompilation.');

insert into card (deck_id, front_content, back_content)
values (3, 'What is the main difference between Java and JavaScript?', 'Java is a statically-typed, compiled language primarily used for building enterprise-scale applications, while JavaScript is a dynamically-typed, interpreted language primarily used for enhancing web pages to provide interactive features.');

insert into card (deck_id, front_content, back_content)
values (3, 'What is the Java Development Kit (JDK)?', 'The Java Development Kit (JDK) is a software development environment used for developing Java applications and applets. It includes the Java Runtime Environment (JRE), an interpreter/loader (java), a compiler (javac), an archiver (jar), a documentation generator (javadoc), and other tools needed in Java development.');

insert into card (deck_id, front_content, back_content)
values (3, 'What is the Java Virtual Machine (JVM)?', 'The Java Virtual Machine (JVM) is an abstract computer that enables a computer to run a Java program. It provides a layer of abstraction between the compiled Java code and the underlying hardware, allowing Java programs to be executed on any platform that supports the JVM.');

insert into card (deck_id, front_content, back_content)
values (3, 'What is the JavaBeans convention?', 'JavaBeans is a convention for designing reusable software components. A JavaBean is a class that encapsulates many objects into a single object (the bean). It follows certain conventions, such as having a no-argument constructor, properties accessible via getter and setter methods, and being serializable.');

insert into card (deck_id, front_content, back_content)
values (3, 'What is the Java Collections Framework?', 'The Java Collections Framework is a set of interfaces and classes in the Java Standard Library that implement commonly reusable collection data structures. It includes interfaces like List, Set, Queue, and Map, along with classes like ArrayList, LinkedList, HashSet, TreeSet, PriorityQueue, HashMap, TreeMap, etc.');

insert into card (deck_id, front_content, back_content)
values (3, 'What is the difference between an abstract class and an interface in Java?', 'An abstract class can have both abstract methods (methods without a body) and concrete methods (methods with a body), while an interface can only have abstract methods. Abstract classes can have instance variables, constructors, and static methods, whereas interfaces cannot.');

insert into card (deck_id, front_content, back_content)
values (3, 'What is the Java Stream API?', 'The Java Stream API is a feature introduced in Java 8 that allows for functional-style operations on streams of elements, such as filtering, mapping, or reducing. It provides a more declarative way to process collections of data.');

insert into card (deck_id, front_content, back_content)
values (3, 'What is the purpose of the main method in Java?', 'The main method is the entry point for any Java application. It is the method that the Java Virtual Machine (JVM) calls when the program starts. The main method must be declared public, static, and have a return type of void, and it must accept a single argument: an array of strings.');

insert into card (deck_id, front_content, back_content)
values (3, 'What is the Java Memory Model?', 'The Java Memory Model is a specification that defines how the Java Virtual Machine (JVM) should manage memory, including how variables are stored and accessed, and how threads interact with shared variables. It ensures that all threads see a consistent view of shared variables, which is crucial for the correct execution of multi-threaded programs.');

-- commit;