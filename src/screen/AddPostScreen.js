import React, {useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadpost} from '../constants/url';
import {useSelector} from 'react-redux';

const dropdownIcon = require('../constants/icons/dropdownIcon.png');

function AddPostScreen() {
  const [imgData, setImgData] = useState();
  const [title, setTitle] = useState('');
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const categoryData = useSelector(
    state => state.LoginPageReducer.categoryList,
  );
  const imagePickerOption = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 400,
    maxWidth: 400,
  };
  const handleUpload = () => {
    launchImageLibrary(imagePickerOption, response => {
      console.log(response.assets[0], 'response');
      setImgData(response.assets[0]);
    });
  };

  const handleData = () => {
    let dataObj = {};
    dataObj = {...dataObj, title, heading, content};
    console.log(dataObj, 'dara');
    const imageData = new FormData();
    imageData.append('fileData', {
      uri: imgData.uri,
      type: imgData.type,
      name: imgData.fileName,
    });
    axios.post(uploadpost, imageData).then(
      async res => {
        console.log(res, 'postok');
        if (res.status === 200) {
        }
      },
      error => {
        console.log(error, 'errrrrr');
      },
    );
  };

  const handleDropdown = data => {
    setSelectedCategory(data);
    setIsVisible(!isVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        <View style={styles.dropdownButton}>
          <Text>
            {selectedCategory.length === 0
              ? 'Select Category'
              : selectedCategory}
          </Text>
          <Image source={dropdownIcon} style={{width: 22, height: 22}} />
        </View>
      </TouchableOpacity>

      {isVisible ? (
        <View style={styles.dropdownList}>
          {categoryData.map(data => (
            <TouchableOpacity
              onPress={() => handleDropdown(data.p_category_name)}>
              <Text style={styles.dataDropdown}>{data.p_category_name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
      <Text>Title</Text>
      <TextInput
        style={styles.textHeader}
        placeholder="Title"
        value={title}
        onChangeText={e => setTitle(e)}
      />
      <Text>Heading</Text>
      <TextInput
        style={styles.textHeader}
        placeholder="Heading"
        value={heading}
        onChangeText={e => setHeading(e)}
      />
      <Text>Content</Text>
      <TextInput
        style={styles.textHeader}
        placeholder="Content"
        value={content}
        onChangeText={e => setContent(e)}
      />

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => handleUpload()}>
        <Text style={styles.uploadButtonText}>Add Photo</Text>
      </TouchableOpacity>
      {imgData ? (
        <Image
          source={{uri: `${imgData.uri}`}}
          style={{height: 300, width: '100%'}}
        />
      ) : (
        console.log('null')
      )}
      {/* <Button onPress={() => handleData()} title="Upload post" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textHeader: {
    width: '100%',
    padding: 4,
    margin: 5,
    borderWidth: 2,
    borderColor: 'red',
  },
  dropdownButton: {
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownList: {},
  dataDropdown: {
    borderWidth: 1,
    padding: 8,
    margin: 1,
  },
  uploadButton: {
    alignItems: 'center',
  },
  uploadButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    borderWidth: 1,
    padding: 12,
  },
});

export default AddPostScreen;
