import React, { useEffect, useState } from 'react';
import {FamilyTree} from './familytree';
import Navbar from '../navbar/Navbar';
import nodes from './nodes';
import "./myfamilytree.scss";
import SdStorageIcon from '@material-ui/icons/SdStorage';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
// import auth from './firebaseConfig';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import {useAuthContext} from '../auth/AuthContext';
// import {useNavigate} from 'react-router-dom';

export let getNodeList = function() {};

const MyFamilyTree = (props) => {

  const divRef = React.createRef();

  const [family, setFamily] = useState({});

  // firebase user情報
  // const {user} = useAuthContext();
  // signin signup画面へのnavigate
  // const navigate = useNavigate();

  useEffect(() => {
    // firebase認証
    // const db = firebase.firestore();
    // const {currentUser} = auth;
    // let unsubscribe = () => {};
    // if (!user) {
    //   navigate('/signin');
    // } else {
    //   const ref = db.collection(`users/${currentUser.uid}/nodes`);
    //   unsubscribe = ref.onSnapshot((snapshot) => {
    //     let userNodes = [];
    //     snapshot.forEach((doc) => {
    //       userNodes = doc.data();
    //     });
    //     setFamilyNodes(() => {
    //       return userNodes.nodeList
    //     });
    //     family.load(
    //       userNodes.nodeList
    //     );
    //   }, (error) => {
    //     alert('データの読み込みに失敗しました。')
    //   });
    // }
    // return unsubscribe;

      setFamily(new FamilyTree(divRef.current, {
        // mouseScrool: FamilyTree.none,  // zoom panをマウスでできるかどうかの指定
        // mode: 'dark',  // 全体の背景色
        // nodes: familyNodes,
        template: 'hugo',  // 表示スタイル
        // roots: [3],  // 誰を起点にするか []にidを記入 例：[1,3]
        nodeMenu: {
          add: {text: 'Add'},
          edit: { text: 'Edit' },
          details: { text: 'Details' },
          remove: {text: 'Remove'},
        },
        nodeTreeMenu: true, // 親、配偶者、子追加機能
        nodeBinding: {
            field_0: 'name',
            field_1: 'bdate',
            img_0: 'photo'
        },

        editForm: {
            titleBinding: "name",
            photoBinding: "photo",
            addMoreBtn: 'Add element',
            addMore: 'Add more elements',
            addMoreFieldName: 'Element name',
            generateElementsFromFields: false,
            elements: [
              { type: 'textbox', label: 'Full Name', binding: 'name' },
              { type: 'textbox', label: 'Email Address', binding: 'email' },
              { type: 'textbox', label: 'Phone', binding: 'phone' },
              [
                { type: 'date', label: 'Date Of Birth', binding: 'bdate' },
                { type: 'date', label: 'Date Of Death', binding: 'ddate'},
              ],
              [
                  { type: 'select',
                    options: [
                      { value: 'bg', text: 'Bulgaria' },
                      { value: 'ru', text: 'Russia' },
                      { value: 'gr', text: 'Greece' },
                      { value: 'us', text: 'USA' },
                      { value: 'uk', text: 'United Kingdom' },
                      { value: 'jp', text: 'Japan' },
                      { value: 'cn', text: 'China' },
                      { value: 'au', text: 'Australia' },
                      { value: 'at', text: 'Austria' },
                      { value: 'be', text: 'Belgium' },
                      { value: 'br', text: 'Brazil' },
                    ],
                    label: 'Country',
                    binding: 'country'
                  },
                  { type: 'textbox', label: 'City', binding: 'city' },
              ],
              { type: 'textbox', label: 'Photo Url', binding: 'photo', btn: 'Upload' },
              { type: 'textbox', label: 'History', binding: 'history' }
            ]
        },
      })
    );
    }, []);

    useEffect(() => {
      if(Object.keys(family).length) {
        console.log('useEffect2',family);
        family.on('render-link', function (sender, args) {
          if (args.cnode.ppid !== undefined) {
              args.html += '<use xlink:href="#heart" x="' + args.p.xa + '" y="' + args.p.ya + '"/>';
          }
        });

        family.on('field', function (sender, args) {
          if (args.name === "bdate") {
            if (args.data["ddate"]) {
                const bdate = new Date(args.data["bdate"]);
                const ddate = new Date(args.data["ddate"]);
                args.value = bdate.toLocaleDateString() + " - " + ddate.toLocaleDateString();
            }
            else {
              const bdate = new Date(args.data["bdate"]);
              args.value = bdate.toLocaleDateString() + " - ";
            }
          }
        });

        // localからnode取得しfirebaseに保存
        // getNodeList = function() {
        //   const nodeList = family.allGetNode();
        //   ref.doc("kYkRbtp0nB2oTV9hrAHt").set({
        //       nodeList
        //     }, {merge: false})
        //       .then((docRef) => {
        //       })
        //       .catch((error) => {
        //         alert('保存に失敗しました。')
        //       });
        //   return nodeList;
        // }

        const localStorageNodes = family.getLocalStorageData();

        if(localStorageNodes === null) {
          console.log('nodes: ', nodes);
          family.load(nodes);
        } else {
          family.load(localStorageNodes);
        }
      }
    }, [family])

    const clickSave = function() {
      family.saveLocalStorage();
      alert('Saveed!');
    };

    const clickRemove = function() {
      localStorage.clear();
      window.location.reload();
      alert('Removed!');
    };

  return (
    <div className="myfamilytree">
      <Navbar />
      <div className="familynode-container">
        <div id="tree" ref={divRef}></div>
      </div>
      <div className="save-icon-container" onClick={clickSave}>
        <span></span>
        <SdStorageIcon className="save-icon"/>
      </div>
      <div className="remove-icon-container" onClick={clickRemove}>
        <span></span>
        <DeleteOutlineIcon className="remove-icon" />
      </div>
    </div>
  )
};

export default React.memo(MyFamilyTree);


