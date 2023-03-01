const express = require("express");
const app = express.Router();
const authorize = require("../middlewares/googleSheets");
const { google } = require("googleapis");
const sendEmail = require("../middlewares/sendEmail");

// const CarbonManagement = require('../db/CarbonManagement');

const route = "/greener-calculator";

app.get(route, (req, res) => {
  res.render("pages/calculator/carbonManagement/index", { message: false });
});

app.post("/greener-carbon-management", sendEmail, (req, res) => {
  async function writeData(auth) {
    const sheets = google.sheets({ version: "v4", auth });
    const today = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
    const array = Object.values(req.body);
    array.unshift(today);
    const values = [array];
    const resource = {
      values,
    };

    sheets.spreadsheets.values.append(
      {
        spreadsheetId: process.env.SHEET_ID,
        range: "Sheet1!A1",
        valueInputOption: "RAW",
        resource: resource,
      },
      (err, result) => {
        if (err) {
          res.render("pages/calculator/carbonManagement/06_pageSix", {
            message: err,
          });
        }
        res.render("pages/calculator/carbonManagement/06_pageSix", {
          message: result.status,
        });
      }
    );
  }

  authorize().then(writeData).catch(console.error);
});

app.post("/greener-carbon-management-info", sendEmail, (req, res) => {
  async function writeData(auth) {
    const sheets = google.sheets({ version: "v4", auth });
    const today = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
    const array = Object.values(req.body);
    array.unshift(today);
    const values = [array];
    const resource = {
      values,
    };

    sheets.spreadsheets.values.append(
      {
        spreadsheetId: process.env.SHEET_ID,
        range: "Sheet2!A1",
        valueInputOption: "RAW",
        resource: resource,
      },
      (err, result) => {
        if (err) {
          res.render("pages/calculator/carbonManagement/06_pageSix", {
            message: err,
          });
        }
        res.render("pages/calculator/carbonManagement/06_pageSix", {
          message: result.status,
        });
      }
    );
  }

  authorize().then(writeData).catch(console.error);
});

module.exports = app;
