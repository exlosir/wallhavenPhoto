import React from 'react'
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-tiny-toast';
import * as Permissions from 'expo-permissions';
class FileStorageImage {

    #directory;
    #uri;
    #name;
    #extensionPhoto;
    #fileName;

    /**
     *
     * @param _uri Путь откуда скачивать файл
     */
    constructor(_uri) {
        this.#directory = FileSystem.documentDirectory + '/photo/';
        this.#uri = _uri;
        var temp = this.#uri.split('.');
        this.#name = temp[temp.length-2].split('/').pop();
        this.#extensionPhoto = this.#uri.split('.').pop();
        this.#fileName = this.#name + "." +this.#extensionPhoto;
    }

    askPermissionForSave = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if(status !== 'granted')
            return Promise.reject(false);
        return Promise.resolve(true)
    }

    downloadImage = async () => {
        const result = await this.askPermissionForSave();
        if(!result) {
            Toast.show("Вы не дали разрешения на сохранение фотографии!");
            return Promise.reject({status: false});
        }

        const file = await FileSystem.downloadAsync(
            this.#uri,
            FileSystem.documentDirectory + this.#fileName);

        MediaLibrary.createAssetAsync(file.uri)
        .then(() => {
            return Promise.resolve({status: true})
        })
        .catch((err) => {
            return Promise.reject(err)
        })
    }

}

export default FileStorageImage;