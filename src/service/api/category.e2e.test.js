"use strict";

const express = require(`express`);
const request = require(`supertest`);
const categoryInit = require(`./categories`);
const CategoryService = require(`../data-service/category`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    id: `taJX8P`,
    title: `Учим HTML и CSS`,
    createdDate: `28.04.2021, 22:32:25`,
    announce: `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    fullText: `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Он написал больше 30 хитов. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    сategory: [`За жизнь`, `Железо`, `Музыка`, `Кино`, `Разное`],
    comments: []
  },
  {
    id: `rK15wv`,
    title: `Как собрать камни бесконечности`,
    createdDate: `22.05.2021, 06:16:58`,
    announce: `Это один из лучших рок-музыкантов.`,
    fullText: `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Из под его пера вышло 8 платиновых альбомов.`,
    сategory: [`Деревья`],
    comments: [
      {id: `hCYAvh`, text: `Мне кажется или я уже читал это где-то?`},
      {id: `WWHU-i`, text: `Совсем немного...`},
      {id: `eS_ZTt`, text: `Хочу такую же футболку :-)`},
      {id: `LlCeFa`, text: `Это где ж такие красоты?`},
      {id: `hiB-Ut`, text: `Плюсую, но слишком много буквы!`},
      {id: `xxVYOB`, text: `Хочу такую же футболку :-)`}
    ]
  },
  {
    id: `1iO_md`,
    title: `Самый лучший музыкальный альбом этого года`,
    createdDate: `24.05.2021, 15:01:25`,
    announce: `Собрать камни бесконечности легко, если вы прирожденный герой. Программировать не настолько сложно, как об этом говорят.`,
    fullText: `Достичь успеха помогут ежедневные повторения.`,
    сategory: [
      `Музыка`,
      `Деревья`,
      `Программирование`,
      `Железо`,
      `Без рамки`,
      `Разное`,
      `IT`
    ],
    comments: [
      {id: `Rq4C70`, text: `Плюсую, но слишком много буквы!`},
      {id: `LRzCAQ`, text: `Плюсую, но слишком много буквы!`},
      {id: `LwAGHo`, text: `Совсем немного...`},
      {id: `gRieL5`, text: `Согласен с автором!`}
    ]
  },
  {
    id: `f1SgTB`,
    title: `Ёлки. История деревьев`,
    createdDate: `23.05.2021, 01:25:49`,
    announce: `Первая большая ёлка была установлена только в 1938 году. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Программировать не настолько сложно, как об этом говорят. Простые ежедневные упражнения помогут достичь успеха. Он написал больше 30 хитов.`,
    fullText: `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    сategory: [
      `Кино`,
      `Разное`,
      `Железо`,
      `Деревья`,
      `Музыка`,
      `Без рамки`,
      `Программирование`
    ],
    comments: []
  },
  {
    id: `8-nm8F`,
    title: `Обзор новейшего смартфона`,
    createdDate: `10.05.2021, 20:23:13`,
    announce: `Достичь успеха помогут ежедневные повторения. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    fullText: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Простые ежедневные упражнения помогут достичь успеха. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
    сategory: [`Разное`, `IT`, `Музыка`, `Без рамки`],
    comments: [
      {
        id: `JbWjGb`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {id: `U7t4MU`, text: `Плюсую, но слишком много буквы!`},
      {id: `GHage2`, text: `Это где ж такие красоты?`},
      {id: `loVTv4`, text: `Планируете записать видосик на эту тему?`}
    ]
  }
];

const app = express();
app.use(express.json());
categoryInit(app, new CategoryService(mockData));

describe(`API returns category list`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 9 categories`, () => expect(response.body.length).toBe(9));

  test(`Category names are "За жизнь", "Железо", "Музыка", "Кино", "Разное", "Деревья", "Программирование", "Без рамки", "IT"`,
      () => expect(response.body).toEqual(
          expect.arrayContaining([`За жизнь`, `Железо`, `Музыка`, `Кино`, `Разное`, `Деревья`, `Программирование`, `Без рамки`, `IT`])
      )
  );
});
