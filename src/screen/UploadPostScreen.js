import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadpost, createPost} from '../constants/url';
import axios from 'axios';

const dropdownIcon = require('../constants/icons/dropdownIcon.png');
const defaultImgData =
  'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';

function UplaodPostScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [imgData, setImgData] = useState();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imgCheck, setImageCheck] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const categoryData = useSelector(
    state => state.LoginPageReducer.categoryList,
  );
  const postData = useSelector(state => state.UplaodPostReducers);
  const userDetail = useSelector(state => state.LoginPageReducer.userDetail);

  const handleDropdown = val => {
    setSelectedCategory(val);
    dispatch({type: 'CATEGORY_DATA', payload: val});
    setIsVisible(!isVisible);
  };
  const imagePickerOption = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 400,
    maxWidth: 400,
  };
  const handleUpload = () => {
    launchImageLibrary(imagePickerOption, response => {
      console.log(response.didCancel, 'response');
      if (response.didCancel) {
        setImgData();
        setImageCheck(false);
      } else {
        setImgData(response.assets[0]);
        setImageCheck(true);
      }
    });
  };
  const handleData = () => {
    let dataObj = {
      userId: userDetail.user_id,
      postTitle: postData.post_title,
      postSubHeading: postData.post_heading,
      postAuthor: userDetail.user_name,
      postCategory: selectedCategory,
      postContent: postData.post_content,
    };
    if (imgCheck) {
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
            dataObj = {...dataObj, postImgUrl: res.data.data.Location};
            axios.post(createPost, dataObj).then(async res => {
              console.log(res, 'createposre');
              if (res.status === 200) {
                dispatch({type: 'CLEAR_DATA'});
              } else {
                setError(res.data);
              }
            });
          }
        },
        error => {
          console.log(error, 'errrrrr');
        },
      );
    } else {
      dataObj = {...dataObj, postImgUrl: defaultImgData};
      axios.post(createPost, dataObj).then(async res => {
        console.log(res, 'createposre');
        if (res.status === 200) {
          dispatch({type: 'CLEAR_DATA'});
        } else {
          setError(res.data);
        }
      });
    }
  };

  const handleInputChanges = (data, casetype) => {
    switch (casetype) {
      case 'title':
        dispatch({type: 'TITLE_DATA', payload: data});
        break;
      case 'heading':
        dispatch({type: 'HEADING_DATA', payload: data});
        break;
      case 'content':
        dispatch({type: 'CONTENT_DATA', payload: data});
        break;
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.headingContainer}>
        <TextInput
          style={styles.TitleInput}
          placeholder="Title*"
          onChangeText={e => handleInputChanges(e, 'title')}
          value={postData.post_title}
        />
        <TextInput
          style={styles.HeadindInput}
          placeholder="Heading*"
          onChangeText={e => handleInputChanges(e, 'heading')}
          value={postData.post_heading}
        />
      </View>

      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        <View style={styles.dropdownButton}>
          <Text style={{fontSize: 18}}>
            {selectedCategory.length === 0
              ? 'Select Category*'
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

      <TextInput
        style={styles.ContentInput}
        placeholder="Blog Here ....."
        multiline={true}
        onChangeText={e => handleInputChanges(e, 'content')}
        value={postData.post_content}
      />
      {imgData ? (
        // <Image
        //   source={{uri: `${imgData.uri}`}}
        //   style={{height: 60, width: 60, marginTop: 10}}
        // />
        <View style={styles.imageFilename}>
          <Text style={{textAlign: 'center', alignItems: 'center'}}>
            {imgData.fileName}
          </Text>
        </View>
      ) : (
        console.log('null')
      )}
      <View style={styles.actionButton}>
        {imgData ? (
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => setImgData()}>
            <Text style={styles.uploadButtonText}>Remove Photo</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handleUpload()}>
            <Text style={styles.uploadButtonText}>Add Photo*</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => handleData()}
          style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#F5F0F0',
  },
  headingContainer: {
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#948F8E',
    margin: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  dropdownList: {
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 12,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
  },
  imageFilename: {
    elevation: 2,
    borderRadius: 12,
    padding: 15,
    margin: 15,
  },
  lineSeprator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  paper: {
    margin: 30,
    flex: 1,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#948F8E',
    backgroundColor: '#F7F4F4',
  },
  HeadindInput: {
    fontSize: 20,
    borderBottomWidth: 0.5,
    padding: 10,
    margin: 10,
  },
  TitleInput: {
    fontSize: 25,
    borderBottomWidth: 0.5,
    padding: 20,
    margin: 10,
  },
  ContentInput: {
    fontSize: 20,
    padding: 20,
    margin: 15,
    height: '50%',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#948F8E',
  },
  dropdownButton: {
    borderStyle: 'solid',
    padding: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#948F8E',
    padding: 20,
  },
  dataDropdown: {
    borderBottomWidth: 0.5,
    padding: 20,
    margin: 1,
    marginTop: 5,
    fontSize: 18,
  },
  uploadButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  uploadButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    borderWidth: 1,
    padding: 12,
  },
});
export default UplaodPostScreen;
