import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const seedData = [
  {
    name: 'ไอ้ชัย',
    bio: 'นายเลงหัวไม้อันดับหนึ่งของโรงเรียนอัสสัมลำปาง',
    age: 19,
    sex: 'male',
    pets: [
      {
        name: 'ไอ้บุญรอด',
        breed: 'นกเอี้ยง',
        age: 1,
        weight: 7,
      },
      {
        name: 'ไอ้บุญเลิศ',
        breed: 'หมาวัด',
        age: 2,
        weight: 40,
      },
    ],
  },
  {
    name: 'ไอ้ทิศ',
    bio: 'นายเลงหัวไม้อันดับหนึ่งของโรงเรียนอรุโนทัย',
    age: 17,
    sex: 'male',
    pets: [
      {
        name: 'ไอ้เจ๋ง',
        breed: 'หมาบัค',
        age: 2,
        weight: 50,
      },
      {
        name: 'ไอ้วาสนา',
        breed: 'หมาบางแก้ว',
        age: 2,
        weight: 60,
      },
    ],
  },
];

async function main() {
  const peopleTxs = [];

  for (const person of seedData) {
    peopleTxs.push(
      prisma.people.create({
        data: {
          name: person.name,
          bio: person.bio,
          age: person.age,
          sex: person.sex,
          pets: {
            create: person.pets,
          },
        },
      }),
    );
  }
  const people = await prisma.$transaction(peopleTxs);
  console.log(`Created ${people.length} posts`);
}

main().finally(async () => prisma.$disconnect());
