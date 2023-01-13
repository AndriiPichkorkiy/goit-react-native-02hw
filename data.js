import location1 from "./assets/images/location1.jpg";
import location2 from "./assets/images/location2.jpg";
import location3 from "./assets/images/location3.jpg";

import userDefImg from "./assets/images/User.jpg";
import anotherUser from "./assets/images/minion.png";

export const user = {
  name: "Natali Romanova",
  email: "email@example.com",
  avatar: userDefImg,
};

export const posts = [
  {
    name: "Ліс",
    photo: location1,
    comments: [
      {
        avatar: anotherUser,
        dateset: new Date(2020, 5, 9, 8, 40, 0),
        text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        isOwn: false,
      },
      {
        avatar: userDefImg,
        dateset: new Date(2020, 5, 9, 9, 14, 0),
        text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
        isOwn: true,
      },
      {
        avatar: anotherUser,
        dateset: new Date(2020, 5, 9, 9, 20, 0),
        text: "Thank you! That was very helpful!",
        isOwn: false,
      },
    ],
    likes: 153,
    location: "Ukraine",
  },
  {
    name: "Захід сонця на Чорному морі",
    photo: location2,
    comments: [
      {
        avatar: anotherUser,
        dateset: new Date(2020, 5, 9, 8, 40, 0),
        text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        isOwn: false,
      },
      {
        avatar: userDefImg,
        dateset: new Date(2020, 5, 9, 9, 14, 0),
        text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
        isOwn: true,
      },
      {
        avatar: anotherUser,
        dateset: new Date(2020, 5, 9, 9, 20, 0),
        text: "Thank you! That was very helpful!",
        isOwn: false,
      },
    ],
    likes: 200,
    location: "Ukraine",
  },
  {
    name: "Старий будинок у Венеції",
    photo: location3,
    comments: [
      {
        avatar: anotherUser,
        dateset: new Date(2020, 5, 9, 8, 40, 0),
        text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        isOwn: false,
      },
      {
        avatar: userDefImg,
        dateset: new Date(2020, 5, 9, 9, 14, 0),
        text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
        isOwn: true,
      },
      {
        avatar: anotherUser,
        dateset: new Date(2020, 5, 9, 9, 20, 0),
        text: "Thank you! That was very helpful!",
        isOwn: false,
      },
    ],
    likes: 200,
    location: "Ukraine",
  },
];
