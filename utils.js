/* eslint-disable prettier/prettier */

import RNCalendarEvents from 'react-native-calendar-events';
import storage from '@react-native-firebase/storage';

export const getDefaultCalendarAsync = async () => {
  const calendarName = 'Dementia';
  try {
    const allCalendars = await RNCalendarEvents.findCalendars();
    const defaultCalendar = allCalendars.find(el => el?.title == calendarName);
    if (defaultCalendar) {
      return defaultCalendar;
    } else {
      let calParams = {
        title: calendarName,
        name: calendarName,
        allowsModifications: true,
        color: '#90EE90',
        entityType: 'event',
        source: {isLocalAccount: true, name: calendarName},
        accessLevel: 'contributor',
        ownerAccount: 'personal',
      };
      await RNCalendarEvents.saveCalendar(calParams);
      const allCalendars2 = await RNCalendarEvents.findCalendars();
      const newCalendar = allCalendars2.find(el => el?.title == calendarName);
      return newCalendar;
    }
  } catch (e) {
    console.log('error returning default calendar ', e);
  }
};

// export const getHtmlString = (
//   name,
//   department,
//   diseaseName,
//   percentage,
//   imageSrc,
//   age,
//   gender,
//   city,
//   cnic,
//   contact,
//   maritalStatus,
// ) => {
//   return `<!DOCTYPE html>
//   <html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
//   <head>
//   <title></title>

//   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
//    <br/>
//   <style type="text/css">
//   <!--
//     p {margin: 0; padding: 0;}	.ft10{font-size:27px;font-family:Times;color:#000000;}
//     .ft11{font-size:14px;font-family:Times;color:#000000;}
//     .ft12{font-size:19px;font-family:Times;color:#e6ac7b;}
//     .ft13{font-size:14px;font-family:Times;color:#e6ac7b;}
//   -->
//   </style>
//   </head>
//   <body bgcolor="#fff" vlink="blue" link="blue">
//   <div id="page1-div" style="position:relative;width:918px;height:1188px;">
//   <p style="position:absolute;top:60px;left:221px;white-space:nowrap" class="ft10">AI&#160;Neurologists:&#160;Alzheimer&#160;Detection</p>
//   <p style="position:absolute;top:69px;left:697px;white-space:nowrap" class="ft11">&#160;</p>
//   <p style="position:absolute;top:107px;left:269px;white-space:nowrap" class="ft12">Together,&#160;we&#160;can&#160;end&#160;Alzheimer&#160;disease&#160;</p>
//   <p style="position:absolute;top:144px;left:54px;white-space:nowrap" class="ft11">&#160;</p>
//   <p style="position:absolute;top:177px;left:54px;white-space:nowrap" class="ft13">Personal Information:&#160;&#160;</p>
//   <p style="position:absolute;top:211px;left:54px;white-space:nowrap" class="ft11">Name:&#160;${name}&#160;</p>
//   <p style="position:absolute;top:245px;left:54px;white-space:nowrap" class="ft11">Department:&#160;${department}&#160;</p>
//   <p style="position:absolute;top:279px;left:54px;white-space:nowrap" class="ft11">&#160;</p>
//   <p style="position:absolute;top:312px;left:54px;white-space:nowrap" class="ft13">Diagnosis:&#160;&#160;</p>
//   <p style="position:absolute;top:346px;left:54px;white-space:nowrap" class="ft11">Label:&#160;${diseaseName}&#160;</p>
//   <p style="position:absolute;top:380px;left:54px;white-space:nowrap" class="ft11">Prediction Result:&#160;${percentage}%&#160;</p>
//   <p style="position:absolute;top:610px;left:274px;white-space:nowrap" class="ft11">&#160;</p>
//   <img width="200" height="250" src="${imageSrc}" style="position:absolute;top:470px;left:44px"/>

//   </div>
//   </body>
//   </html>
//   `;
// };

export const getHtmlString = (
  name,
  department,
  diseaseName,
  percentage,
  imageSrc,
  age,
  gender,
  city,
  cnic,
  contact,
  maritalStatus,
) => {
  return `<!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
  
  <head>
      <title></title>
  
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <br />
      <style type="text/css">
          <!--
          p {
              margin: 0;
              padding: 0;
          }
  
          .ft10 {
              font-size: 27px;
              font-family: Times;
              color: #000000;
          }
  
          .ft11 {
              font-size: 16px;
              font-family: Times;
              color: #000000;
          }
  
          .ft12 {
              font-size: 19px;
              font-family: Times;
              color: #e6ac7b;
  
          }
  
          .ft13 {
              font-size: 18px;
              font-family: Times;
              color: #e6ac7b;
              margin-bottom: 10px;
          }
  
          .ft14 {
              font-size: 20px;
              font-family: Times;
              color: #000000;
          }
  
  
          .flex-container {
              display: flex;
              flex-direction: column;
              margin-bottom: 20px;
          }
  
          .flex-container label {
              width: 100px;
              font-weight: bold;
              margin-right: 10px;
          }
  
          .hr {
              border-top: 1px solid #e6ac7b;
              border-bottom: 2px solid #e6ac7b;
              width: 80%;
              margin-left: 50px;
              margin-top: 30px;
              padding-bottom: 7px;
          }
  
          .line {
              border-bottom: 2px solid black;
              width: 80%;
              margin-left: 50px;
              margin-top: 30px;
              padding-bottom: 5px;
          }
  
          .header {
              display: flex;
              flex-direction: row;
          }
  
          .logo {
              width: 100px;
              height: 60px;
              padding: 60px;
          }
          -->
      </style>
  </head>
  
  <body bgcolor="#fff" vlink="blue" link="blue">
      <div id="page1-div" style="position:relative;width:918px;height:1388px;">
          <div class="header">
              <img src="{require('../assets/images/logo.png')}"
                  alt="Logo" class="logo">
              <p style="position:absolute;top:60px;left:221px;white-space:nowrap" class="ft10">
                  AI&#160;Neurologists:&#160;Alzheimer&#160;Detection</p>
              <p style="position:absolute;top:69px;left:697px;white-space:nowrap" class="ft11">&#160;</p>
              <p style="position:absolute;top:107px;left:269px;white-space:nowrap" class="ft12">
                  Together,&#160;we&#160;can&#160;end&#160;Alzheimer&#160;disease&#160;</p>
          </div>
          <p style="position:absolute;top:88px;" class="line">&#160;</p>
          <p style="position:absolute;top:150px;left:700px;white-space:nowrap" class="ft13">Date | Time&#160;&#160;</p>
  
          <p style="position:absolute;top:144px;left:54px;white-space:nowrap" class="ft11">&#160;</p>
          <p style="position:absolute;top:185px;left:54px;white-space:nowrap" class="ft13"><b>Personal
                  Information </b>&#160;&#160;</p>
          <p style="position:absolute;top:152px;" class="hr">&#160;</p>
  
  
          <div style="display: flex; flex-direction: row;" class="flex-container">
              <div>
                  <p style="position:absolute;top:225px;left:54px;white-space:nowrap" class="ft11"><b>Name:</b>&#160;
                  ${name}&#160;</p>
              </div>
              <div>
                  <p style="position:absolute;top:225px;left:450px;white-space:nowrap" class="ft11">
                      <b>Department:</b>&#160;${department}&#160;
                  </p>
              </div>
          </div>
  
          <div style="display: flex; flex-direction: row;" class="flex-container">
              <div>
                  <p style="position:absolute;top:260px;left:54px;white-space:nowrap" class="ft11">
                      <b>Age:</b>&#160;${age}&#160;</p>
              </div>
              <div>
                  <p style="position:absolute;top:260px;left:450px;white-space:nowrap" class="ft11">
                      <b>Gender:</b>&#160;${gender}&#160;
                  </p>
              </div>
          </div>
  
          <div style="display: flex; flex-direction: row;" class="flex-container">
              <div>
                  <p style="position:absolute;top:297px;left:54px;white-space:nowrap" class="ft11">
                      <b>City:</b>&#160;${city}&#160;
                  </p>
              </div>
              <div>
                  <p style="position:absolute;top:297px;left:450px;white-space:nowrap" class="ft11"><b>Contact
                          No:</b>&#160;${contact}&#160;</p>
              </div>
          </div>
  
          <div style="display: flex; flex-direction: row;" class="flex-container">
              <div>
                  <p style="position:absolute;top:335px;left:54px;white-space:nowrap" class="ft11">
                      <b>CNIC:</b>&#160;${cnic}&#160;
                  </p>
              </div>
              <div>
                  <p style="position:absolute;top:335px;left:450px;white-space:nowrap" class="ft11"><b>Marital
                          Status:</b>&#160;${maritalStatus}&#160;</p>
              </div>
          </div>
  
          <p style="position:absolute;top:380px;left:350px;white-space:nowrap" class="ft13"><b>Final
                  Report</b>&#160;&#160;</p>
          <p style="position:absolute;top:347px;" class="hr">&#160;</p>
  
          <p style="position:absolute;top:422px;left:250px;white-space:nowrap" class="ft14">
              Well&#160;Being&#160;Checkup&#160;Summary&#160;Report&#160</p>
  
          <p style="position:absolute;top:465px;left:54px;white-space:nowrap" class="ft13"><b>Diagnosis</b>&#160;&#160;
          </p>
          <p style="position:absolute;top:432px;" class="hr">&#160;</p>
  
          <table style="position:absolute;top:520px;left:52px;white-space:nowrap;border-collapse:collapse;width:80%">
              <tr>
                  <th style="border: 1px solid black;padding: 5px;" colspan="3">Alzheimer Disease</th>
              </tr>
              <tr>
                  <td style="border: 1px solid black;padding: 5px;" colspan="2">Disease Type: &#160; ${diseaseName}&#160;
                  </td>
                  <td rowspan="2" style="border: 1px solid black;padding: 5px;text-align:center;">
                      <p style="padding: 5px;">MRI Image&#160;</p>
                      <img src="${imageSrc}"alt="MRI image" style="width: 170px;height: 200px;">
                  </td>
              </tr>
              <tr>
                  <td style="border: 1px solid black;padding: 5px;" colspan="2">Accuracy: &#160; ${percentage}&#160;</td>
              </tr>
          </table>
      </div>
  </body>
  </html>
  `;
};

//  // Uploading File
export const uploadMedia = async (filename, uploadUri, onComplete) => {
  console.log('filename === ', filename);
  console.log('uploadUri =====> ', uploadUri);
  const ref = storage().ref(filename);
  const task = ref.putFile(uploadUri);
  // set progress state
  task.on('state_changed', snapshot => {
    console.log(snapshot.state);
  });
  try {
    await task
      .then(item => {
        ref.getDownloadURL().then(url => {
          console.log('url is ', url);
          onComplete(url);
        });
      })
      .catch(error => {
        console.log('error getting url ', error);
        onComplete('error');
      });
  } catch (e) {
    onComplete('error');
  }
};

// COMMON METHOD
makeid = length => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
