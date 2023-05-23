/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  Platform,
  Dimensions,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';
import {Button, TextInput} from 'react-native-paper';
import colors from '../assets/colors/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';

axios.interceptors.request.use(
  async config => {
    let request = config;
    request.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    request.url = configureUrl(config.url);
    return request;
  },
  error => error,
);

export const {height, width} = Dimensions.get('window');

export const configureUrl = url => {
  let authUrl = url;
  if (url && url[url.length - 1] === '/') {
    authUrl = url.substring(0, url.length - 1);
  }
  return authUrl;
};

export const fonts = {
  Bold: {fontFamily: 'Roboto-Bold'},
};

const options = {
  mediaType: 'photo',
  quality: 1,
  width: 256,
  height: 256,
  includeBase64: true,
};
export default function Detection({navigation}) {
  const [result, setResult] = useState('');
  const [label, setLabel] = useState('');
  const [image, setImage] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReportButtonDisabled, setIsReportButtonDisabled] = useState(true);

  const getPredication = async params => {
    try {
      var bodyFormData = new FormData();
      bodyFormData.append('file', params);
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: bodyFormData,
      });
      const data = await response.json();
      setLabel(data.class);
      setResult(data.confidence);
      setIsReportButtonDisabled(false);
      console.log(data);
    } catch (error) {
      console.error('Error in getPrediction:', error);
    }
  };

  const manageCamera = async type => {
    openLibrary();
  };

  const clearOutput = () => {
    setResult('');
    setImage('');
  };

  const getResult = async (path, response) => {
    setImage(path);
    setLabel('Predicting...');
    setResult('');
    const params = {
      uri: path,
      name: response.assets[0].fileName,
      type: response.assets[0].type,
    };
    // setLabel('Test Disease');
    // setResult(0.65);
    // await generateReport(path);
    // return;
    setIsReportButtonDisabled(true);
    const res = await getPredication(params);
    const data = await response.json();
    if (res?.data?.class) {
      setLabel(res.data.class);
      setResult(res.data.confidence);
    } else {
      setLabel(data.class);
      setResult(data.confidence);
    }
    setIsReportButtonDisabled(false);
  };

  const openLibrary = async () => {
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const uri = response.assets[0].uri;
        const path = Platform.OS !== 'ios' ? uri : 'file://' + uri;
        getResult(path, response);
      }
    });
  };

  const [userInfo, setUserInfo] = useState({
    age: '',
    gender: '',
    cnic: '',
    city: '',
    maritalStatus: '',
    contact: '',
  });
  const [username, setUsername] = useState('');
  //const [canDownloadReport, setCanDownloadReport] = useState(false);

  // Listen for changes to the user object in Firebase and update the userInfo state object
  useEffect(() => {
    const currentUser = auth().currentUser;
    const {uid} = currentUser;

    const unsubscribe = firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(snapshot => {
        const data = snapshot.data();
        setUserInfo(data);
        setUsername(data.username);
      });

    return () => unsubscribe();
  }, []);

  const handleReportButtonPress = () => {
    // Show user information form in modal
    setIsModalVisible(true);
  };

  const generateReport = async imagePath => {
    //setIsModalVisible(false);
    const currentUser = auth().currentUser;
    const {uid} = currentUser;
    await firestore().collection('users').doc(uid).update(userInfo);

    const department = 'Neurology';
    const diseaseName = label;
    const percentage = parseFloat(result).toFixed(2) * 100;

    const html = `<!DOCTYPE html>
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
                width: 85%;
                margin-left: 50px;
                margin-top: 30px;
                padding-bottom: 7px;
            }
    
            .line {
                border-bottom: 2px solid black;
                width: 85%;
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
                    ${username}&#160;</p>
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
                        <b>Age:</b>&#160;${userInfo.age}&#160;</p>
                </div>
                <div>
                    <p style="position:absolute;top:260px;left:450px;white-space:nowrap" class="ft11">
                        <b>Gender:</b>&#160;${userInfo.gender}&#160;
                    </p>
                </div>
            </div>
    
            <div style="display: flex; flex-direction: row;" class="flex-container">
                <div>
                    <p style="position:absolute;top:297px;left:54px;white-space:nowrap" class="ft11">
                        <b>City:</b>&#160;${userInfo.city}&#160;
                    </p>
                </div>
                <div>
                    <p style="position:absolute;top:297px;left:450px;white-space:nowrap" class="ft11"><b>Contact
                            No:</b>&#160;${userInfo.contact}&#160;</p>
                </div>
            </div>
    
            <div style="display: flex; flex-direction: row;" class="flex-container">
                <div>
                    <p style="position:absolute;top:335px;left:54px;white-space:nowrap" class="ft11">
                        <b>CNIC:</b>&#160;${userInfo.cnic}&#160;
                    </p>
                </div>
                <div>
                    <p style="position:absolute;top:335px;left:450px;white-space:nowrap" class="ft11"><b>Marital
                            Status:</b>&#160;${userInfo.maritalStatus}&#160;</p>
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
    
            <table style="position:absolute;top:520px;left:52px;white-space:nowrap;border-collapse:collapse;width:85%">
                <tr>
                    <th style="border: 1px solid black;padding: 5px;" colspan="3">Alzheimer Disease</th>
                </tr>
                <tr>
                    <td style="border: 1px solid black;padding: 5px;" colspan="2">Disease Type: &#160; ${diseaseName}&#160;
                    </td>
                    <td rowspan="2" style="border: 1px solid black;padding: 5px;text-align:center;">
                        <p style="padding: 5px;">MRI Image&#160;</p>
                        <img src="${image}"alt="MRI image" style="width: 170px;height: 200px;">
                    </td>
                </tr>
               
                
            </table>
        </div>
    </body>
    </html>
    `;

    try {
      const option = {
        html,
        fileName: 'Report',
        directory: RNFS.DocumentDirectoryPath,
      };
      if (!uid) {
        console.log('Not logged in');
        return;
      }

      // Generate the PDF.
      const pdf = await RNHTMLtoPDF.convert(option);
      setPdfUrl(`file://${pdf.filePath}`);

      // Create a reference to the Firestore collection for the user's reports.
      const reportsRef = firestore()
        .collection('users')
        .doc(uid)
        .collection('reports');

      // Get the report file path.
      const reportFilePath = pdf.filePath;

      // Create a unique filename for the report in Firebase Storage.
      const filename = `reports/${uid}/Report.pdf`;

      // Upload the report to Firebase Storage.
      const storageRef = storage().ref(filename);
      await storageRef.putFile(reportFilePath);

      // Get the download URL of the uploaded report.
      const downloadURL = await storageRef.getDownloadURL();

      //Save the download URL to Firestore.
      const reportDoc = await reportsRef.add({downloadURL});

      // Display success message or perform any other actions.
      console.log('Report uploaded successfully', reportDoc.id);
    } catch (error) {
      console.error('Error uploading report:', error);
      Alert.alert('There is an error generating the report');
    }
  };

  useEffect(() => {
    if (pdfUrl) {
      // Show the PDF in a WebView component.
      return () => {
        setPdfUrl(null);
      };
    }
  }, [pdfUrl]);

  // const downloadReport = async () => {
  //   try {
  //     if (!canDownloadReport) {
  //       console.log('Report is not available for download yet');
  //       return;
  //     }
  //     // Extract the filename from the pdfUrl
  //     const filename = pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1);

  //     // Create a reference to the report file in Firebase Storage
  //     const storageRef = storage().ref(filename);

  //     // Get the download URL of the report
  //     const downloadURL = await storageRef.getDownloadURL();

  //     // Download the file to the device's storage
  //     const downloadFilePath = `${RNFS.DocumentDirectoryPath}/${filename}`;
  //     const downloadResult = await RNFS.downloadFile({
  //       fromUrl: downloadURL,
  //       toFile: downloadFilePath,
  //     });

  //     // Display success message or perform any other actions
  //     console.log('Report downloaded successfully:', downloadResult);
  //   } catch (error) {
  //     // Handle any errors that occur during the download process
  //     console.error('Error downloading report:', error);
  //     Alert.alert('There was an error downloading the report');
  //   }
  // };

  return (
    <View style={[styles.outer]}>
      <StatusBar animated={true} backgroundColor="#B9B0E5" />
      <View style={styles.container}>
        <View style={styles.header}>
          <AntDesign
            name="left"
            size={18}
            color={colors.background}
            onPress={() => navigation.navigate('Tabs')}
            style={{marginTop: 4}}
          />
          <Text style={styles.head}>Detection</Text>
          <TouchableOpacity
            onPress={handleReportButtonPress}
            disabled={isReportButtonDisabled} // Disable button if isReportButtonDisabled is true
          >
            <View style={styles.report}>
              <Fontisto name="upload" color={colors.background} />
              <Text style={styles.reportText}>Report</Text>
            </View>
          </TouchableOpacity>
          {/*Modal for User Information*/}
          <Modal
            visible={isModalVisible}
            animationType="slide"
            onRequestClose={() => setIsModalVisible(false)}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>User Information</Text>

              {/* User information form */}
              <TextInput
                mode="outlined"
                style={styles.input}
                label="Age"
                keyboardType="numeric"
                value={userInfo.age}
                onChangeText={text => setUserInfo({...userInfo, age: text})}
                theme={{
                  roundness: 25,
                }}
              />
              <TextInput
                mode="outlined"
                style={styles.input}
                label="Gender"
                value={userInfo.gender}
                onChangeText={text => setUserInfo({...userInfo, gender: text})}
                theme={{
                  roundness: 25,
                }}
              />
              <TextInput
                mode="outlined"
                style={styles.input}
                label="CNIC"
                keyboardType="numeric"
                value={userInfo.cnic}
                onChangeText={text => setUserInfo({...userInfo, cnic: text})}
                theme={{
                  roundness: 25,
                }}
              />
              <TextInput
                mode="outlined"
                style={styles.input}
                label="City"
                value={userInfo.city}
                onChangeText={text => setUserInfo({...userInfo, city: text})}
                theme={{
                  roundness: 25,
                }}
              />
              <TextInput
                mode="outlined"
                style={styles.input}
                label="Marital Status"
                value={userInfo.maritalStatus}
                onChangeText={text =>
                  setUserInfo({...userInfo, maritalStatus: text})
                }
                theme={{
                  roundness: 25,
                }}
              />

              <TextInput
                mode="outlined"
                style={styles.input}
                label="Contact No"
                keyboardType="numeric"
                value={userInfo.contact}
                onChangeText={text => setUserInfo({...userInfo, contact: text})}
                theme={{
                  roundness: 25,
                }}
              />

              {/* Generate report button */}
              <TouchableOpacity onPress={generateReport}>
                <Button mode="contained" style={styles.reportbtn}>
                  Generate Report
                </Button>
              </TouchableOpacity>
            </View>
            {pdfUrl && (
              <Modal animationType="slide" onRequestClose={() => setPdfUrl('')}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    paddingTop: 5,
                  }}>
                  <SafeAreaView />
                  {/* Top Bar */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 45,
                      paddingHorizontal: 10,
                      justifyContent: 'space-between',
                    }}>
                    <TouchableWithoutFeedback
                      onPress={() => setIsModalVisible(false)}>
                      <View
                        style={{
                          height: 40,
                          width: 40,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={require('./../assets/images/CloseIcon.png')}
                          resizeMode="contain"
                          style={{
                            height: '40%',
                            width: '40%',
                          }}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 18,
                      }}>
                      Report
                    </Text>

                    <View style={{width: 45}} />
                  </View>
                  {/* Pdf here*/}
                  <View style={{flex: 1}}>
                    <Pdf
                      source={{uri: `${pdfUrl}`, cache: true}}
                      trustAllCerts={false}
                      style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                      }}
                    />
                  </View>
                </View>
                {/* <TouchableOpacity onPress={downloadReport}>
                  <Button mode="contained" style={styles.reportbtn}>
                    Download Report
                  </Button>
                </TouchableOpacity> */}
              </Modal>
            )}
            {isLoading ? (
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 1,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'white',
                  }}>
                  Generating Report.....
                </Text>
                <ActivityIndicator
                  size={'small'}
                  color={'white'}
                  style={{marginTop: 10}}
                />
              </View>
            ) : null}
          </Modal>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Detect your disease</Text>
          <Text style={styles.text}>
            You can detect your disease by uploading MRI image of your brain.
          </Text>
          <View style={styles.frame}>
            <Text style={styles.uptext}>Upload your MRI {'\n'} Image</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => manageCamera('Photo')}>
              <Entypo name="upload" size={45} style={styles.uploadImage} />
            </TouchableOpacity>
            {(image?.length && (
              <Image source={{uri: image}} style={styles.imageStyle} />
            )) ||
              null}
          </View>
          {result && label && (
            <View style={styles.mainOuter}>
              <Text style={[styles.space, styles.labelText]}>
                {'Label:  '}
                <Text style={styles.resultText}>{label}</Text>
              </Text>
              {/* <Text style={[styles.space, styles.labelText]}>
                {'Confidence:  '}
                <Text style={styles.resultText}>
                  {parseFloat(result).toFixed(2) * 100 + '%'}
                </Text>
              </Text> */}
            </View>
          )}

          <TouchableOpacity onPress={clearOutput}>
            <Button mode="contained" style={styles.button}>
              Clean
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    marginLeft: 0,
    marginBottom: 30,
  },
  head: {
    color: colors.background,
    fontSize: 17,
    marginLeft: 100,
  },
  content: {
    padding: 1,
  },
  heading: {
    color: colors.background,
    fontSize: 26,
  },
  title: {
    color: colors.background,
    fontSize: 22,
    marginBottom: 18,
  },
  frame: {
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 5,
    height: 300,
    width: 250,
    marginTop: 40,
    marginLeft: 30,
    alignItems: 'center',
  },
  imageStyle: {
    width: 246,
    height: 296,
    position: 'absolute',
    borderRadius: 3,
  },
  button: {
    marginTop: 20,
    marginLeft: 60,
    width: 200,
    height: 50,
    backgroundColor: colors.heading,
    borderRadius: 30,
    alignItems: 'center',
    paddingTop: 4,
  },
  uploadImage: {
    height: 50,
    width: 50,
    marginTop: 10,
    color: colors.greytxt,
  },
  outer: {
    flex: 1,
  },
  space: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  labelText: {
    color: 'black',
    fontSize: 20,
    ...fonts.Bold,
    marginBottom: 5,
  },
  resultText: {
    fontSize: 20,
    ...fonts.Bold,
    color: 'red',
  },
  uptext: {
    color: colors.greytxt,
    fontSize: 18,
    marginTop: 85,
    marginBottom: 10,
    textAlign: 'center',
  },
  mainOuter: {
    marginTop: 15,
    alignItems: 'center',
  },
  report: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 50,
  },
  reportText: {
    color: colors.background,
    marginLeft: 5,
  },
  input: {
    marginBottom: 8,
    width: 300,
    marginLeft: 0,
    borderColor: colors.background,
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: '60%',
  },
  modalTitle: {
    marginBottom: 15,
    paddingTop: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.background,
    fontSize: 20,
  },
  reportbtn: {
    marginTop: 20,
    width: 300,
    height: 50,
    backgroundColor: colors.heading,
    borderRadius: 30,
    alignItems: 'center',
    paddingTop: 4,
  },
});
