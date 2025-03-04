import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Use react-native-vector-icons
import QRCode from 'react-native-qrcode-svg'; // QR code generation
import Share from 'react-native-share'; // Sharing functionality
import {contents} from '../../context';
import {useNavigation} from '@react-navigation/native';
import {moderateScale, scaleWidth} from '../../utils/dimensions';
import {colors, fontSize} from '../../utils/LightTheme';
import Header from '../../components/commonComponents/Header';
import ShareDownloadComponent from '../../components/generateQRCodesComponent/ShareDownloadComponent';
// Import the context

const GenerateCustomQRCodeURL = () => {
  //   const {contents, setLanguage} = useLocalization(); // Use contents from context
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState<
    'location' | 'scans' | 'time' | 'language'
  >('location');
  const [locations, setLocations] = useState<{country: string; url: string}[]>([
    {country: '', url: ''},
  ]);
  const [scans, setScans] = useState<{numScans: number; url: string}[]>([
    {numScans: 0, url: ''},
  ]);
  const [times, setTimes] = useState<
    {timezone: string; timeStart: string; timeEnd: string; url: string}[]
  >([{timezone: '', timeStart: '', timeEnd: '', url: ''}]);
  const [languages, setLanguages] = useState<{language: string; url: string}[]>(
    [{language: '', url: ''}],
  );
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null); // Keep the QR code value persistent

  // Clear QR Code when switching tabs
  useEffect(() => {
    setQrCodeValue(null); // Clear QR code when tab changes
  }, [selectedTab]);

  // Add new location field
  const addLocationField = () => {
    setLocations(prevLocations => [...prevLocations, {country: '', url: ''}]);
  };

  // Add new scan field
  const addScanField = () => {
    setScans(prevScans => [...prevScans, {numScans: 0, url: ''}]);
  };

  // Add new time field
  const addTimeField = () => {
    setTimes(prevTimes => [
      ...prevTimes,
      {timezone: '', timeStart: '', timeEnd: '', url: ''},
    ]);
  };

  // Add new language field
  const addLanguageField = () => {
    setLanguages(prevLanguages => [...prevLanguages, {language: '', url: ''}]);
  };

  // Handle changes for location, scan, time, and language fields
  const handleFieldChange = (
    index: number,
    type:
      | 'country'
      | 'url'
      | 'numScans'
      | 'timezone'
      | 'timeStart'
      | 'timeEnd'
      | 'language',
    value: string,
    fieldType: 'location' | 'scan' | 'time' | 'language',
  ) => {
    if (fieldType === 'location') {
      const updatedLocations = [...locations];
      updatedLocations[index][type] = value;
      setLocations(updatedLocations);
    } else if (fieldType === 'scan') {
      const updatedScans = [...scans];
      updatedScans[index][type] = value;
      setScans(updatedScans);
    } else if (fieldType === 'time') {
      const updatedTimes = [...times];
      updatedTimes[index][type] = value;
      setTimes(updatedTimes);
    } else {
      const updatedLanguages = [...languages];
      updatedLanguages[index][type] = value;
      setLanguages(updatedLanguages);
    }
  };

  // Generate QR Code based on the active tab
  // Generate QR Code based on the active tab with validation
  const generateQRCode = () => {
    let data = '';

    // Validate fields before generating QR code
    const isValid = () => {
      switch (selectedTab) {
        case 'location':
          return locations.every(
            location => location.country.trim() && location.url.trim(),
          );
        case 'scans':
          return scans.every(scan => scan.numScans > 0 && scan.url.trim());
        case 'time':
          return times.every(
            time =>
              time.timezone.trim() &&
              time.timeStart.trim() &&
              time.timeEnd.trim() &&
              time.url.trim(),
          );
        case 'language':
          return languages.every(
            language => language.language.trim() && language.url.trim(),
          );
        default:
          return false;
      }
    };

    if (!isValid()) {
      Alert.alert(contents('Error'), contents('FillAllFields')); // Show alert if any field is empty
      return;
    }

    // Convert data to JSON based on the selected tab
    switch (selectedTab) {
      case 'location':
        data = JSON.stringify(locations);
        break;
      case 'scans':
        data = JSON.stringify(scans);
        break;
      case 'time':
        data = JSON.stringify(times);
        break;
      case 'language':
        data = JSON.stringify(languages);
        break;
      default:
        data = 'No data available';
        break;
    }

    setQrCodeValue(data); // Set QR code data
  };

  // Share QR Code
  const shareQRCode = async () => {
    if (!qrCodeValue) {
      Alert.alert(contents('Error'), contents('GenerateQRCodeFirst'));
      return;
    }
    try {
      const options = {
        title: contents('ShareQRCodeTitle'),
        url: `data:image/png;base64,${qrCodeValue}`,
        type: 'image/png',
      };
      await Share.open(options);
    } catch (error) {
      console.error(error);
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'location':
        return (
          <View>
            <Text style={styles.sectionHeading}>{contents('Location')}</Text>
            {locations.map((location, index) => (
              <View key={index} style={styles.fieldContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={contents('Country')}
                  value={location.country}
                  onChangeText={text =>
                    handleFieldChange(index, 'country', text, 'location')
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder={contents('URLLocation')}
                  value={location.url}
                  onChangeText={text =>
                    handleFieldChange(index, 'url', text, 'location')
                  }
                />
              </View>
            ))}
            <TouchableOpacity
              style={styles.addButton}
              onPress={addLocationField}>
              <MaterialIcons name="add" size={24} color="#fff" />
              <Text style={styles.addText}>{contents('AddLocation')}</Text>
            </TouchableOpacity>
          </View>
        );
      case 'scans':
        return (
          <View>
            <Text style={styles.sectionHeading}>{contents('Scans')}</Text>
            {scans.map((scan, index) => (
              <View key={index} style={styles.fieldContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={contents('NumberOfScans')}
                  value={String(scan.numScans)}
                  onChangeText={text =>
                    handleFieldChange(index, 'numScans', text, 'scan')
                  }
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  placeholder={contents('URLforScan')}
                  value={scan.url}
                  onChangeText={text =>
                    handleFieldChange(index, 'url', text, 'scan')
                  }
                />
              </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addScanField}>
              <MaterialIcons name="add" size={24} color="#fff" />
              <Text style={styles.addText}>{contents('AddScan')}</Text>
            </TouchableOpacity>
          </View>
        );
      case 'time':
        return (
          <View>
            <Text style={styles.sectionHeading}>{contents('Time')}</Text>
            {times.map((time, index) => (
              <View key={index} style={styles.fieldContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={contents('Timezone')}
                  value={time.timezone}
                  onChangeText={text =>
                    handleFieldChange(index, 'timezone', text, 'time')
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder={contents('TimeStart')}
                  value={time.timeStart}
                  onChangeText={text =>
                    handleFieldChange(index, 'timeStart', text, 'time')
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder={contents('TimeEnd')}
                  value={time.timeEnd}
                  onChangeText={text =>
                    handleFieldChange(index, 'timeEnd', text, 'time')
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder={contents('URLTime')}
                  value={time.url}
                  onChangeText={text =>
                    handleFieldChange(index, 'url', text, 'time')
                  }
                />
              </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addTimeField}>
              <MaterialIcons name="add" size={24} color="#fff" />
              <Text style={styles.addText}>{contents('AddTime')}</Text>
            </TouchableOpacity>
          </View>
        );
      case 'language':
        return (
          <View>
            <Text style={styles.sectionHeading}>{contents('Language')}</Text>
            {languages.map((language, index) => (
              <View key={index} style={styles.fieldContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={contents('Language')}
                  value={language.language}
                  onChangeText={text =>
                    handleFieldChange(index, 'language', text, 'language')
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder={contents('URLLanguage')}
                  value={language.url}
                  onChangeText={text =>
                    handleFieldChange(index, 'url', text, 'language')
                  }
                />
              </View>
            ))}
            <TouchableOpacity
              style={styles.addButton}
              onPress={addLanguageField}>
              <MaterialIcons name="add" size={24} color="#fff" />
              <Text style={styles.addText}>{contents('AddLanguage')}</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={contents('customURL')}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.tabBar}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setSelectedTab('location')}
          style={[
            styles.tabButton,
            {
              backgroundColor:
                selectedTab === 'location'
                  ? colors.tabSelected
                  : colors.grey600,
            },
          ]}>
          <Text style={styles.tabText}>{contents('Location')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setSelectedTab('scans')}
          style={[
            styles.tabButton,
            {
              backgroundColor:
                selectedTab === 'scans' ? colors.tabSelected : colors.grey600,
            },
          ]}>
          <Text style={styles.tabText}>{contents('Scans')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setSelectedTab('time')}
          style={[
            styles.tabButton,
            {
              backgroundColor:
                selectedTab === 'time' ? colors.tabSelected : colors.grey600,
            },
          ]}>
          <Text style={styles.tabText}>{contents('Time')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setSelectedTab('language')}
          style={[
            styles.tabButton,
            {
              backgroundColor:
                selectedTab === 'language'
                  ? colors.tabSelected
                  : colors.grey600,
            },
          ]}>
          <Text style={styles.tabText}>{contents('Language')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderContent()}
      </ScrollView>

      <TouchableOpacity style={styles.generateButton} onPress={generateQRCode}>
        <Text style={styles.buttonText}>{contents('GenerateQRCode')}</Text>
      </TouchableOpacity>

      {qrCodeValue ? (
        <ShareDownloadComponent downloadUrl={qrCodeValue} />
      ) : // <View style={styles.qrCodeContainer}>
      //   <QRCode value={qrCodeValue} size={200} />
      //   <TouchableOpacity style={styles.shareButton} onPress={shareQRCode}>
      //     <Text style={styles.buttonText}>{contents('ShareQRCode')}</Text>
      //   </TouchableOpacity>
      // </View>
      null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: colors.white,
  },
  sectionHeading: {
    fontSize: fontSize.textSize18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: moderateScale(10),
    marginTop: moderateScale(20),
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom: moderateScale(20),
    borderBottomWidth: 1,
    borderColor: colors.grey100,
  },
  tabButton: {
    flex: 1,
    padding: moderateScale(2),
    alignItems: 'center',
    borderRadius: scaleWidth(5),
    margin: scaleWidth(5),
  },

  tabText: {
    fontSize: fontSize.textSize16,
    fontWeight: 'bold',
    color: colors.white,
  },
  fieldContainer: {
    marginBottom: moderateScale(20),
  },
  input: {
    height: moderateScale(50),
    borderWidth: 1,
    borderColor: colors.grey200,
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(8),
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10),
    backgroundColor: colors.highlightSelected,
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(8),
  },
  addText: {
    color: colors.white,
    marginLeft: moderateScale(5),
  },
  contentContainer: {
    paddingBottom: moderateScale(20),
  },
  generateButton: {
    backgroundColor: colors.success,
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginTop: moderateScale(20),
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.textSize16,
    fontWeight: 'bold',
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginTop: moderateScale(20),
  },
  shareButton: {
    backgroundColor: colors.highlightSelected,
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
});

export default GenerateCustomQRCodeURL;
