import React, { useEffect } from 'react';
import FamilyTree from '@balkangraph/familytree.js';
import nodes from './nodes';


const MyFamilyTree = (props) => {

  const divRef = React.createRef();

  useEffect(function() {
    const family = new FamilyTree(divRef.current, {
      // mouseScrool: FamilyTree.none,  // zoom panをマウスでできるかどうかの指定
      // mode: 'dark',  // 全体の背景色
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

    family.load(
      nodes
    );
  }, [])


  return (
    <div style={{height: '100%'}}>
      <div id="tree" ref={divRef}></div>
    </div>
  )
};

export default React.memo(MyFamilyTree);


