## Description

Start the containers:
```bash
docker-compose up --force-recreate --build -d
```

Migrations not tested. They should work with:

```bash
npm run migration:run ./data-source-shard1.ts 
npm run migration:run ./data-source-shard2.ts 
npm run migration:run ./data-source-shard3.ts 
```

In case they don't, just create the table manually on each DB instance:

```sql
CREATE TABLE "public"."consumption" ( 
	"id" BigSerial NOT NULL,
	"timestamp" Timestamp With Time Zone NOT NULL,
	"source_id" Character Varying NOT NULL,
	"value" Character Varying NOT NULL,
	"description" Character Varying NOT NULL
);
```

And then populate it with some random data:

```sql
--INSTANCE 1
insert into consumption (timestamp, source_id, value, description) values (now(), 1, 1.07, 'Taken from instance 1');
insert into consumption (timestamp, source_id, value, description) values (now(), 1, 1.11, 'Taken from instance 1');
insert into consumption (timestamp, source_id, value, description) values (now(), 1, 1.13, 'Taken from instance 1');

--INSTANCE 2
insert into consumption (timestamp, source_id, value, description) values (now(), 2, 1.77, 'Taken from instance 2');
insert into consumption (timestamp, source_id, value, description) values (now(), 2, 1.39, 'Taken from instance 2');
insert into consumption (timestamp, source_id, value, description) values (now(), 2, 1.44, 'Taken from instance 2');

--INSTANCE 3
insert into consumption (timestamp, source_id, value, description) values (now(), 3, 0.15, 'Taken from instance 3');
insert into consumption (timestamp, source_id, value, description) values (now(), 3, 0.16, 'Taken from instance 3');
insert into consumption (timestamp, source_id, value, description) values (now(), 3, 0.18, 'Taken from instance 3');
```

Endpoint for all agreggated data:
```bash
http://localhost:3000/consumption
```

Endpoint for partitioned data:
```bash
http://localhost:3000/consumption/1
http://localhost:3000/consumption/2
http://localhost:3000/consumption/3
```
