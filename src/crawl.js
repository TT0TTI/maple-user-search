const axios = require("axios");
const cheerio = require("cheerio");

let html = "";

const getHtml = async (keyword) => {
  const URL = `https://maple.gg/u/${encodeURI(keyword)}`;
  try {
    return await axios.get(URL);
  } catch (error) {
    console.error("없는 유저다");
  }
};

const parsing = async (keyword) => {
  let name = keyword;
  if (!html || name == keyword) {
    html = await getHtml(keyword);
    name = keyword;
  }

  const $ = cheerio.load(html.data);
  const $bodyList = $("#app");

  let courses = {};
  $bodyList.each((index, node) => {
    const userName = $(node).find(".col-lg-8 > h3 > b").text().trim();
    const userLev = $(node)
      .find(".user-summary-list > li")
      .eq(0)
      .text()
      .slice(3, 6)
      .trim();
    const userJob = $(node).find(".user-summary-list > li").eq(1).text().trim();
    const userGild = $(node)
      .find(".user-additional > div")
      .eq(0)
      .find("a")
      .text()
      .trim();
    const userAllR = $(node)
      .find(".user-additional > div")
      .eq(1)
      .find("span")
      .text()
      .trim();
    const userWorldR = $(node)
      .find(".user-additional > div")
      .eq(2)
      .find("span")
      .text()
      .trim();
    const userJobAR = $(node)
      .find(".user-additional > div")
      .eq(3)
      .find("span")
      .text()
      .trim();
    const userJobWR = $(node)
      .find(".user-additional > div")
      .eq(4)
      .find("span")
      .text()
      .trim();
    const userServer = $(node).find(".align-middle").attr("src");

    courses = {
      userName,
      userLev,
      userJob,
      userAllR,
      userWorldR,
      userJobAR,
      userJobWR,
      userGild,
      userServer,
    };
  });
  return courses;
};

module.exports = { parsing };
