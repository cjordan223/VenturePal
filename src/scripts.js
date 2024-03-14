// scripts.js

// generate random user data
import { faker } from '@faker-js/faker';

export function generateDummyData(numCards) {
    const data = [];
    for (let i = 0; i < numCards; i++) {
        data.push({
            id: i,
            name: faker.commerce.productName(),
            description: faker.lorem.paragraphs(3), // Generates 3 paragraphs of lorem ipsum text
            imageUrl: `https://picsum.photos/200/300?random=${i}`,
        });
    }
    return data;
}


//wipe all existing users
export function massDeleteItems(natureSpots, idsToDelete) {
    return natureSpots.filter(spot => !idsToDelete.includes(spot.id));
}

