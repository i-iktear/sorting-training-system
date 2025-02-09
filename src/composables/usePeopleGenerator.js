import { faker } from "@faker-js/faker";

export function usePeopleGenerator() {
  const generatePeople = (count) => {
    const generatedPeople = [];
    const usedPotatoes = new Set();

    for (let i = 0; i < count; i++) {
      let potatoes;

      do {
        potatoes = faker.number.int({ min: 1, max: 100 });
      } while (usedPotatoes.has(potatoes));

      usedPotatoes.add(potatoes);

      generatedPeople.push({
        id: i,
        email: faker.internet.email(),
        potatoes,
        tags: ["Customers"],
        fullName: faker.person.fullName(),
        location: "Lithuania",
        selected: false,
      });
    }

    return generatedPeople;
  };

  return {
    generatePeople,
  };
}
