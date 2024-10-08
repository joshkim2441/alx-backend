#!/usr/bin/yarn dev
import { createClient, print } from "redis";

const client = createClient();

client.on('error', (err) => {
    console.log('Redis client not connected to the server:', err.toString());
});

const updateHash = (hashName, fileName, fieldValue) => {
    client.HSET(hashName, fileName, fieldValue, print);
};

const printHash = (hashName) => {
    client.HGETALL(hashName, (__err, reply) => console.log(reply));
};

function main() {
    const hashObj = {
        Portland: 50,
        Seattle: 80,
        'New York': 20,
        Bogota: 20,
        Cali: 40,
        Paris: 2,
    };
    for (const [field, value] of Object.entries(hashObj)) {
        updateHash('HolbertonSchools', field, value);
    }
    printHash('HolbertonSchools');
}

client.on('Connect', () => {
    console.log('Redis client connected to the server');
    main();
});
