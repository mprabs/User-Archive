import React, { useEffect, useState } from "react";
import moment from "moment";

import "./styles.css";

import iconUp from "../assets/icon_arrow01.svg";
import iconRight from "../assets/icon_arrow02.svg";
import iconClip from "../assets/icon_clip.svg";
import iconMail from "../assets/icon_mail_sp.svg";

import { data as myData, monthNames } from "./data";

const isMobileView = window.innerWidth > 400 ? false : true;

export default function ResultTable({ dateInput, onDataSize }) {
  const [data, setData] = useState(myData);
  const [iconRotation, setIconRotation] = useState(0);
  const [showMobile, setshowMobile] = useState(isMobileView);

  useEffect(() => {
    window.addEventListener("resize", handleMobileDisplay);
    return () => window.removeEventListener("resize", handleMobileDisplay);
  }, []);

  useEffect(() => {
    onDataSize(data.length);
    sortData();
  }, [iconRotation, data]);

  useEffect(() => {
    filterDataByDates(dateInput);
  }, [dateInput]);

  // SORT THE ORDER OF THE DATA
  // @MOBILE -> ALPHABETICALLY ACCORDING TO 'From'
  // @WEB -> ACCORDING TO 'Date'
  const sortData = () => {
    const sortedData = data.sort((a, b) => {
      if (showMobile) {
        if (iconRotation === 0) {
          var temp = a;
          a = b;
          b = temp;
        }
        return a.from === b.from ? 0 : a.from < b.from ? -1 : 1;
      }
      return handleDateDifference(a.date, b.date);
    });
    setData(sortedData);
  };

  // FILTER DATA ACCORDING TO THE DATE INPUT
  const filterDataByDates = (input) => {
    const dateFrom = handleDateFormat(input[0]);
    const dateTo = handleDateFormat(input[1]);
    setData(
      myData.filter((item) => {
        var date = item.date.toString().split(" ")[0];
        if (moment(date).isAfter(dateFrom) && moment(date).isBefore(dateTo)) {
          return true;
        }
      })
    );
  };

  // CALCULATE DIFFERENCE BETWEEN TWO DATES
  const handleDateDifference = (now, then) => {
    if (iconRotation === 0) {
      var temp = then;
      then = now;
      now = temp;
    }
    return moment(now, "YYYY/MM/DD HH:mm").diff(
      moment(then, "YYYY/MM/DD HH:mm")
    );
  };

  // CHANGE DATE FORMAT TO YYYY/MM/DD
  const handleDateFormat = (value) => {
    var date1 = value.toString().split(" ");
    var month = monthNames.indexOf(date1[1]) + 1;
    var day = date1[2];
    var year = date1[3];
    return `${year}/${month}/${day}`;
  };

  // TOGGLE ICONS IN MOBILE/WEB DISPLAY
  const handleMobileDisplay = () => {
    setshowMobile(window.innerWidth > 400 ? false : true);
  };

  const toggleSortIcon = () => {
    setIconRotation((angle) => (angle === 0 ? 180 : 0));
  };

  // RENDER EMAILS IN THE 'TO' COLUMN OF THE TABLE
  const renderToElements = (arr) => {
    return (
      <div className="emails">
        <span className="email">
          {arr[0].email}
          {!showMobile && arr.length > 1 && <span>, ...</span>}
          {showMobile && arr.length === 2 && `, ${arr[1].email}`}
          {showMobile && arr.length > 2 && `, ${arr[1].email}, ...`}
        </span>
        {!showMobile && arr.length > 1 && (
          <span className="email-box">{`+${arr.length - 1}`}</span>
        )}
        {showMobile && arr.length > 2 && (
          <span className="email-box">{`+${arr.length - 2}`}</span>
        )}
      </div>
    );
  };

  // RENDER DATE ACCORDING TO THE DIFFERENCE WITH PRESENT TIME
  const renderDate = (date) => {
    var dateToDisplay = date.split(" ");
    const dateToday = moment().format().slice(0, 10);
    const isBeforeThisMonth = moment(date).isBefore(dateToday, "month");
    const isBeforeThisYear = moment(date).isBefore(dateToday, "year");

    if (isBeforeThisYear) {
      return dateToDisplay[0];
    }

    if (isBeforeThisMonth) {
      var check = moment(dateToDisplay[0]);
      var month = check.format("MMMM");
      return `${month.slice(0, 3)} ${dateToDisplay[0].slice(8, 11)}`;
    }

    return dateToDisplay[1];
  };

  // NO RENDERING PROVIDED NO EMAIL DATA TO DISPLAY
  if (data.length === 0) {
    return null;
  }

  // RENDER TABLE
  return (
    <div className="result table">
      <table>
        <thead>
          <tr>
            <th className="from-icon">
              From
              {showMobile && (
                <img
                  style={{ transform: `rotate(${iconRotation}deg)` }}
                  src={iconUp}
                  onClick={toggleSortIcon}
                />
              )}
            </th>
            <th>To</th>
            <th>Subject</th>
            <th>
              Date
              {!showMobile && (
                <img
                  style={{ transform: `rotate(${iconRotation}deg)` }}
                  src={iconUp}
                  onClick={toggleSortIcon}
                />
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {!showMobile &&
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.from}</td>
                <td>{renderToElements(item.to)}</td>
                <td className="attachment">
                  <span>{item.subject}</span>
                  <div className="attachment-icon">
                    {item.attachment.id && <img src={iconClip} />}
                  </div>
                </td>
                <td>{renderDate(item.date)}</td>
              </tr>
            ))}

          {showMobile &&
            data.map((item) => (
              <div className="mob-table-item" key={item.id}>
                <div className="row">
                  <div className="icon-container">
                    <img src={iconMail} />
                  </div>
                  <div className="main-content">
                    <div className="row">
                      <span className="item-from">{item.from}</span>
                      <div className="date-icons">
                        {item.attachment.id && (
                          <img className="clip" src={iconClip} />
                        )}
                        {renderDate(item.date)}
                        <img src={iconRight} />
                      </div>
                    </div>
                    <div className="row">{renderToElements(item.to)}</div>
                  </div>
                </div>
                <span>{item.subject}</span>
              </div>
            ))}
        </tbody>
      </table>
    </div>
  );
}
