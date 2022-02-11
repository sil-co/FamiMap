import React, { useEffect, useState } from 'react';
import {FamilyTree} from './familytree';


import nodes from './nodes';
import {auth} from './firebase';
import firebase from 'firebase/app';
// import 'firebase/auth';
import 'firebase/firestore';
import {useAuthContext} from '../auth/AuthContext';
import {useNavigate} from 'react-router-dom';

const MyFamilyTree = (props) => {

  const [familyNodes, setFamilyNodes] = useState(nodes);

  const divRef = React.createRef();

  const {user} = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {

    const db = firebase.firestore();
    const {currentUser} = auth;
    let unsubscribe = () => {};
    if (!currentUser) {
      navigate('/signin');
    } else {
      const ref = db.collection(`users/${currentUser.uid}/nodes`);
      unsubscribe = ref.onSnapshot((snapshot) => {
        const userNodes = [];
        // const objNodes = {};
        snapshot.forEach((doc) => {
          // objNodes.id = doc.data().id;
          // objNodes.gender = doc.data().gender;
          // objNodes.pids = doc.data().pids;
          userNodes.push(doc.data());

        });
        console.log('userNodes', userNodes);
        setFamilyNodes(() => {

          return userNodes
        });

        family.load(
          userNodes
        );

        console.log('familyNodes', familyNodes);
      }, (error) => {
        alert('データの読み込みに失敗しました。')
      });

      const family = new FamilyTree(divRef.current, {
        // mouseScrool: FamilyTree.none,  // zoom panをマウスでできるかどうかの指定
        // mode: 'dark',  // 全体の背景色
        // nodes: familyNodes,
        template: 'hugo',  // 表示スタイル
        roots: [3],  // 誰を起点にするか []にidを記入 例：[1,3]
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
                      { value: 'gr', text: 'Greece' }
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
      });

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

      console.log('nodes', nodes);

      family.load(
        familyNodes
      );

    }

    return unsubscribe;

    }, [])



  return (
    <div style={{height: '100%'}}>
      <div id="tree" ref={divRef}></div>
    </div>
  )
};

export default React.memo(MyFamilyTree);


