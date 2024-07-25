const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyMTgzNDQxNSwianRpIjoiZDM1NjRkYzEtMzE5ZS00ZTI4LWE1ZGYtZmYzNTA5ZDI5OTJmIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFyaXN0aWRlQGdtYWlsLmNvbSIsIm5iZiI6MTcyMTgzNDQxNSwiY3NyZiI6IjBmYzFiZjNjLWRjYjItNDkxMi05OGY2LTE0NjRkYWY0NzQ4NyIsImV4cCI6MTcyMTkyMDgxNSwiaXNBZG1pbiI6ImludmVzdG9yIn0.b83dJbXvnY5ua8kWzK-h3GmRQ8dINl3StorwIYHOZfc";
const url = "http://127.0.0.1:5000";

const bus_startups = [
  {
    name: "MediTech co",
    email: "startup1@test.com",
    phone: "08012345678",
    stage: "Seed fund",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1721284985/ygit8gfa8mwjnxxfobqr.webp",
    location: "Kigali",
    businessType: "Ecommerce",
    growthRate: 0.6,
    cost: 241,
    capital: 12345,
  },
  {
    name: "GreenTech Innovations",
    email: "greentech@test.com",
    phone: "08022345678",
    stage: "Series A",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1721284985/ygit8gfa8mwjnxxfobqr.webp",
    location: "Kigali",
    businessType: "AI & Tech",
    growthRate: 0.8,
    cost: 500,
    capital: 20000,
  },
  {
    name: "HealthEase",
    email: "healthease@test.com",
    phone: "08032345678",
    stage: "Seed round",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1721284985/ygit8gfa8mwjnxxfobqr.webp",
    location: "Musanze",
    businessType: "Healthtech",
    growthRate: 0.5,
    cost: 300,
    capital: 15000,
  },
  {
    name: "EduFutures",
    email: "edufutures@test.com",
    phone: "08042345678",
    stage: "Pre series A",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1721284985/ygit8gfa8mwjnxxfobqr.webp",
    location: "Muhanga",
    businessType: "Edtech",
    growthRate: 0.7,
    cost: 200,
    capital: 10000,
  },
  {
    name: "SecureNet",
    email: "securenet@test.com",
    phone: "08052345678",
    stage: "Series B",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1721284985/ygit8gfa8mwjnxxfobqr.webp",
    location: "Huye",
    businessType: "Cybersecurity",
    growthRate: 0.9,
    cost: 450,
    capital: 25000,
  },
  {
    name: "AgroPro",
    email: "agropro@test.com",
    phone: "08062345678",
    stage: "Seed funding",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1721284985/ygit8gfa8mwjnxxfobqr.webp",
    location: "Nyamata",
    businessType: "Agriculture",
    growthRate: 0.4,
    cost: 100,
    capital: 5000,
  },
  {
    name: "LogiTech",
    email: "logitech@test.com",
    phone: "08072345678",
    stage: "Fresh funding",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1721284985/ygit8gfa8mwjnxxfobqr.webp",
    location: "Kigali",
    businessType: "Logistics",
    growthRate: 0.3,
    cost: 350,
    capital: 12000,
  },
  {
    name: "FinWiz",
    email: "finwiz@test.com",
    phone: "08082345678",
    stage: "Series C",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1721284985/ygit8gfa8mwjnxxfobqr.webp",
    location: "Musanze",
    businessType: "Fintech",
    growthRate: 0.85,
    cost: 400,
    capital: 22000,
  },
  {
    name: "BankSage",
    email: "banksage@test.com",
    phone: "08092345678",
    stage: "Post series A",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1721284985/ygit8gfa8mwjnxxfobqr.webp",
    location: "Muhanga",
    businessType: "Banking",
    growthRate: 0.65,
    cost: 280,
    capital: 18000,
  },
  {
    name: "Sportify",
    email: "sportify@test.com",
    phone: "08102345678",
    stage: "Seed round",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1721284985/ygit8gfa8mwjnxxfobqr.webp",
    location: "Huye",
    businessType: "Sports",
    growthRate: 0.55,
    cost: 310,
    capital: 14000,
  },
  {
    name: "FoodieTech",
    email: "foodietech@test.com",
    phone: "08112345678",
    stage: "Series A",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1721284985/ygit8gfa8mwjnxxfobqr.webp",
    location: "Nyamata",
    businessType: "Food tech",
    growthRate: 0.75,
    cost: 290,
    capital: 16000,
  },
];

const new_investors = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@test.com",
    phone: "08012345678",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1719892649/i3jwwmnf45dpygfreg4j.jpg",
  },
  {
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@test.com",
    phone: "08022345678",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1719892649/i3jwwmnf45dpygfreg4j.jpg",
  },
  {
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert@test.com",
    phone: "08032345678",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1719892649/i3jwwmnf45dpygfreg4j.jpg",
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    email: "emily@test.com",
    phone: "08042345678",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1719892649/i3jwwmnf45dpygfreg4j.jpg",
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    email: "michael@test.com",
    phone: "08052345678",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1719892649/i3jwwmnf45dpygfreg4j.jpg",
  },
  {
    firstName: "Jessica",
    lastName: "Wilson",
    email: "jessica@test.com",
    phone: "08062345678",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1719892649/i3jwwmnf45dpygfreg4j.jpg",
  },
  {
    firstName: "David",
    lastName: "Martinez",
    email: "david@test.com",
    phone: "08072345678",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1719892649/i3jwwmnf45dpygfreg4j.jpg",
  },
  {
    firstName: "Laura",
    lastName: "Garcia",
    email: "laura@test.com",
    phone: "08082345678",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1719892649/i3jwwmnf45dpygfreg4j.jpg",
  },
  {
    firstName: "James",
    lastName: "Miller",
    email: "james@test.com",
    phone: "08092345678",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1719892649/i3jwwmnf45dpygfreg4j.jpg",
  },
  {
    firstName: "Sarah",
    lastName: "Lopez",
    email: "sarah@test.com",
    phone: "08102345678",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1719892649/i3jwwmnf45dpygfreg4j.jpg",
  },
  {
    firstName: "Daniel",
    lastName: "Martinez",
    email: "daniel@test.com",
    phone: "08112345678",
    password: "qwerty",
    profilePic:
      "https://res.cloudinary.com/dnq1hgigs/image/upload/v1719892649/i3jwwmnf45dpygfreg4j.jpg",
  },
];

// bus_startups.forEach((startup) => {
//   fetch(`${url}/business-startup`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(startup),
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data.id))
//     .catch((err) => console.log(err));
// });

// new_investors.forEach((investor) => {
//   fetch(`${url}/investor`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(investor),
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data.id))
//     .catch((err) => console.log(err));
// });

const startups = [
  { id: "2f451c34-b63c-4838-980a-4aabf53d16fa", cost: 241, growthRatio: 0.6 },
  { id: "631d6308-a463-4302-bf46-97a5d965132b", cost: 500, growthRatio: 0.8 },
  { id: "2f451c34-b63c-4838-980a-4aabf53d16fa", cost: 300, growthRatio: 0.5 },
  { id: "d62e0239-4b5a-4820-b33d-231174ea3b31", cost: 200, growthRatio: 0.7 },
  { id: "4119ad36-51f7-4011-be12-6af4aef5c7be", cost: 450, growthRatio: 0.9 },
  { id: "a38fcdb3-1bf6-4c28-b1b8-0c4e27f63c06", cost: 100, growthRatio: 0.4 },
  { id: "e96470b3-ee98-4fd4-aa18-400a804b7789", cost: 350, growthRatio: 0.3 },
  { id: "e6bb22a7-20b3-49d4-9283-c7a3df91a531", cost: 400, growthRatio: 0.85 },
];

const investors = [
  "dbc87332-be09-4585-8abb-79012961ad5a",
  "e3585580-7e6d-498b-9e13-6bf7b1cbde65",
  "24e740f9-ea88-4b7e-9e32-ce736714651d",
  "39afdc94-1b0d-450d-a732-cbde5accfaf8",
  "7bc9fbcd-9211-45d6-94a9-203c4571fbcb",
  "a5583855-2719-4b5d-8fad-98c88c6226a3",
  "7bc9fbcd-9211-45d6-94a9-203c4571fbcb",
  "24e740f9-ea88-4b7e-9e32-ce736714651d",
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const funds = [];

for (let i = 0; i < 10; i++) {
  const investorId = getRandomElement(investors);
  const selectedStartup = getRandomElement(startups);
  const { id: startupId, cost: startCost, growthRatio } = selectedStartup;
  const amount = Math.floor(Math.random() * 100000) + 10000;
  const numberOfDays = Math.floor(Math.random() * 300) + 1;

  const endCost = startCost + startCost * growthRatio * numberOfDays;
  const finalAmount = amount + amount * growthRatio * numberOfDays;
  const ROI = finalAmount - amount;

  const fund = {
    investorId,
    businessId: startupId,
    amount,
    numberOfDays,
    startCost,
    endCost,
    ROI,
  };

  funds.push(fund);
}

// funds.forEach((fund) => {
//   fetch(`${url}/business-investment`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(fund),
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
// });
