// import client from "./dbconfig";
const client = require("./dbconfig");

// const memberGET = async () => {
//   try {
//     await client.connect();
//     console.log("connection was succesful");
//   } catch (error) {
//     console.log(error);
//     return null;
//   } finally {
//     try {
//       await client.end();
//       return null;
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
//   }
// };

const membersGET = async () => {
  try {
    const queryString = "SELECT * FROM MEMBERS ORDER BY MEMBERID";
    const res = await client.query(queryString);
    // await client.end();
    const data = res.rows;
    console.log(res.rows);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const clubsGET = async () => {
  try {
    const queryString = "SELECT * FROM CLUBS";
    const res = await client.query(queryString);
    const data = res.rows;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const applicationGET = async () => {
  try {
    const queryString = "SELECT * FROM APPLICATIONS";
    const res = await client.query(queryString);
    const data = res.rows;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const applicationsCREATE = async (data) => {
  const queryString =
    "INSERT INTO APPLICATIONS(FULLNAME, EMAIL, AGE, MATRICNO, COURSE, KULLIYAH, CLUBID, application_status) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
  const values = [
    data.fullname,
    data.email,
    data.age,
    data.matricno,
    data.course,
    data.kulliyah,
    data.clubid,
    data.applicationStatus,
  ];
  try {
    const res = await client.query(queryString, values);
    const data = res.rows;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const membersEDIT = async (data) => {
  const updateString =
    "UPDATE MEMBERS SET fullname = $1, age = $2, matricno = $3, course = $4, kulliyah = $5, status = $6, designation = $7, position = $8 WHERE memberid = $9 RETURNING *";
  const values = [
    data.fullname,
    data.age,
    data.matricno,
    data.course,
    data.kulliyah,
    data.status,
    data.designation,
    data.position,
    data.memberid,
  ];

  try {
    const res = await client.query(updateString, values);
    const data = res.rows;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const membersDELETE = async (memberid) => {
  const queryString = "DELETE FROM MEMBERS WHERE memberid = $1";
  values = [memberid];
  try {
    await client.query(queryString, values);
    console.log("deleted from ", memberid);
    return { message: "succesfully deleted", member: memberid };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getMembers: membersGET,
  getClubs: clubsGET,
  getApplications: applicationGET,
  createApplication: applicationsCREATE,
  editMembers: membersEDIT,
  deleteMembers: membersDELETE,
};
