const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

async function main() {
    console.log("Seeding database...");

    const users = [
        { name: "Ethan Hunt", email: "ethan@imf.com", password: "Pwd@121", role: "Agent" },
        { name: "Luther Stickell", email: "luther@imf.com", password: "Pwd@121", role: "Agent" },
        { name: "Benji Dunn", email: "benji@imf.com", password: "Pwd@121", role: "Agent" }
    ];

    for (let user of users) {
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    }

    await prisma.user.createMany({ data: users });

    const createdUsers = await prisma.user.findMany();

    const gadgets = [
        { name: "Gadget 1", codename: "G1", status: "Available", userId: createdUsers[0].id },
        { name: "Gadget 2", codename: "G2", status: "Available", userId: createdUsers[1].id },
        { name: "Gadget 3", codename: "G3", status: "Available", userId: createdUsers[2].id }
    ];
    
    await prisma.gadget.createMany({ data: gadgets });

    console.log("Seeding completed.");
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
