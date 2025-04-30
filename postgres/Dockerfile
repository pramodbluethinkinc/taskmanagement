# base image
FROM postgres:12-alpine

# Copy initialization SQL script to container
COPY init.sql /docker-entrypoint-initdb.d/

# Start PostgreSQL with pg_amqp library loaded
CMD ["bash", "-c", "rm -rf /var/lib/postgresql/data/* && docker-entrypoint.sh postgres"]