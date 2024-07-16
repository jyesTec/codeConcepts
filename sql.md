## SQL__used to manage and interact with the relational databases.
#### SQL vs NoSQL
- SQL
    - table based,
    - usually, have a defined schema
        - PostgreSQL
        - MySQL
        - SQLite
        - Oracle

- NoSQL
    - have a variety of storage methods
        - such as, Document based
        - Key-Value store
    - have a dynamic schema.
            - MongoDb, Cassendra, CouchDb
            - Redis
            - ElasticSearch
            - FireBase



#### Select__retrieves / returns  the dataset from one or more tables.
```sql
select id from users;
select * from users;  -- *, wildCard Entry
select id, name, age from users;
```

## Tables
#### Create
```sql
create Table tableName{
    id INTEGER,
    name varchar,
    age INTEGER
}
```
#### ALTER
- can alter the dB schema without deleting or recreating it.
- allows to make the changes in place without deleting any data.
1. RENAME
    ```sql
    ALTER TABLE employees RENAME to Emps;

    ALTER TABLE contractors RENAME column salary to invoice
    ```
2. ADD / DROP
    ```sql
    ALTER TABLE contractors ADD column job_title TEXT;


    ALTER TABLE contractors DROP column is_manager;
    ```

## DataBase Migrations
- where we add or remove a column / table in the existing table.
- ADD
    - tends to safe
    - Update the Db, this doesn't breaks the DB
    - update the code with the new fields
    - and deploy the table with new changes.
- DELETE
    - removal of code,
    - removal of those lines from code
    - stop quering that code.
    - now safely update the db without breaking it.
- UPDATE
    - needs extra care
    - schedule downtime, stop the application for sometime. Generally, safe but notRecommended.
    - same time deploy, 
    - copy the database table, then the deploy the newCode with the refrences.
    - Aliasing, where we deploy the new code with another dB name, test it if its working fine, then we can keep the new code and remove the old code/Db.
> Aliasing is the simplest and the best approcah for data migration.

- UP Migration
    - create table,
    - delete col
    - create newTable
    - rename col
    - deletes table
- DOWN Migration
    - rollup, roll down
    - delete table
    - add column
    - delete table
    - rename the column
    - add Table



