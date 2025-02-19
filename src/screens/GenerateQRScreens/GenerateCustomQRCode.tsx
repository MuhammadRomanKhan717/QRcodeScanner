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
import ShareDownloadComponent from '../../components/generateQRCodesComponent/ShareDownloadComponent';

const GenerateCustomQRCode = () => {
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
  const generateQRCode = () => {
    let data = '';
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
      Alert.alert('Error', 'Please generate the QR code first!');
      return;
    }
    try {
      const options = {
        title: 'Share QR Code',
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
            <Text style={styles.sectionHeading}>Location</Text>
            {locations.map((location, index) => (
              <View key={index} style={styles.fieldContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Country"
                  value={location.country}
                  onChangeText={text =>
                    handleFieldChange(index, 'country', text, 'location')
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="URL Location"
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
              <Text style={styles.addText}>Add Location</Text>
            </TouchableOpacity>
          </View>
        );
      case 'scans':
        return (
          <View>
            <Text style={styles.sectionHeading}>Scans</Text>
            {scans.map((scan, index) => (
              <View key={index} style={styles.fieldContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Number of scans"
                  value={String(scan.numScans)}
                  onChangeText={text =>
                    handleFieldChange(index, 'numScans', text, 'scan')
                  }
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  placeholder="URL for scan"
                  value={scan.url}
                  onChangeText={text =>
                    handleFieldChange(index, 'url', text, 'scan')
                  }
                />
              </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addScanField}>
              <MaterialIcons name="add" size={24} color="#fff" />
              <Text style={styles.addText}>Add Scan</Text>
            </TouchableOpacity>
          </View>
        );
      case 'time':
        return (
          <View>
            <Text style={styles.sectionHeading}>Time</Text>
            {times.map((time, index) => (
              <View key={index} style={styles.fieldContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Timezone"
                  value={time.timezone}
                  onChangeText={text =>
                    handleFieldChange(index, 'timezone', text, 'time')
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Time Start"
                  value={time.timeStart}
                  onChangeText={text =>
                    handleFieldChange(index, 'timeStart', text, 'time')
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Time End"
                  value={time.timeEnd}
                  onChangeText={text =>
                    handleFieldChange(index, 'timeEnd', text, 'time')
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="URL Time"
                  value={time.url}
                  onChangeText={text =>
                    handleFieldChange(index, 'url', text, 'time')
                  }
                />
              </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addTimeField}>
              <MaterialIcons name="add" size={24} color="#fff" />
              <Text style={styles.addText}>Add Time</Text>
            </TouchableOpacity>
          </View>
        );
      case 'language':
        return (
          <View>
            <Text style={styles.sectionHeading}>Language</Text>
            {languages.map((language, index) => (
              <View key={index} style={styles.fieldContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Language"
                  value={language.language}
                  onChangeText={text =>
                    handleFieldChange(index, 'language', text, 'language')
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="URL Language"
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
              <Text style={styles.addText}>Add Language</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setSelectedTab('location')}
          style={styles.tabButton}>
          <Text style={styles.tabText}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('scans')}
          style={styles.tabButton}>
          <Text style={styles.tabText}>Scans</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('time')}
          style={styles.tabButton}>
          <Text style={styles.tabText}>Time</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('language')}
          style={styles.tabButton}>
          <Text style={styles.tabText}>Language</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderContent()}
      </ScrollView>

      <TouchableOpacity style={styles.generateButton} onPress={generateQRCode}>
        <Text style={styles.buttonText}>Generate QR Code</Text>
      </TouchableOpacity>

      {qrCodeValue ? (
        <ShareDownloadComponent downloadUrl={qrCodeValue} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  addText: {
    color: '#fff',
    marginLeft: 5,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  generateButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  shareButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default GenerateCustomQRCode;
