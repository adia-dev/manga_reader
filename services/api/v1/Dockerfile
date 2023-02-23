FROM rust:1.67

WORKDIR /usr/src/v1
COPY . .

RUN cargo install --path .

CMD ["v1"]