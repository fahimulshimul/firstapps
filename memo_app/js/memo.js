"use strict";

window.addEventListener("DOMContentLoaded",
function( ){

    if(typeof localStorage === "undefined"){
        window.alert("このブラウザは Local Storage 機能が実装されていません");
        return;
    }else{
        viewStorage( );
        saveLocalStorage( );// save to local storage
        delLocalStorage();// delete from local storage
        allClearLocalStorage();//clear all  data from local storage
        selectTable();//select data

    }
},false
);

function saveLocalStorage( ){
    const save = document.getElementById("save");
    save.addEventListener("click",
    function(e){
        e.preventDefault();
        const key   = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;


        if (key =="" || value==""){
            window.alert("Key.Memo はいずれも必須です.")
            return;
        }else{
            let w_confirm = window.confirm( "LocalStorageに\n「" + key + " " + value + " 」\nの内容を保存（save）しますか？");//version-up1 added
            if (w_confirm === true) { //version-up1 added
            localStorage.setItem(key,value);
            viewStorage( );
            let w_msg = "LocalStorageに「" + key + " " + value + "」を保存(save)しました。";
            window.alert(w_msg);
            document.getElementById("textKey").value="";
            document.getElementById("textMemo").value="";
            }//version-up1 added
        }
    },false
    );
};
    // delete function for memo from local storage //version-up3 chg
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
    function(e) {
        e.preventDefault();
        const chkbox1 = document.getElementsByName("chkbox1");//version-up3 added
        const table1 = document.getElementById("table1");//version-up3 added
        let w_cnt = 0; //version-up3 chg w_sel="0" ==> w_cnt=0
        w_cnt = selectCheckBox("del");//select data from table version-up2 chg: selectRadioBtn ==> selectCheckBox...version-up3 chg w_sel ==> w_cnt, 引数：なし==>"del"

        if (w_cnt >= 1) {//version-up3 chg w_sel==="1" ==> w_cnt>=1
            //const key = document.getElementById("textKey").value; //version-up3 del
            //const value = document.getElementById("textMemo").value; //version-up3 del
            let w_confirm = window.confirm( "LocalStorageから選択されえてる" + w_cnt + "件を削除(delete)しますか？");//version-up1 added // version-up3 chg
            if (w_confirm === true) {//version-up1 added
                for(let i=0; i < chkbox1.length; i++) {//version-up3 chg
                    if(chkbox1[i].checked) { //version-up3 add
                        localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data); //version-up3 chg
                    } //version-up3 add
                } //version-up3 add
            viewStorage( );
            let w_msg = "LocalStorageから" + w_cnt +  "件を削除(delete) しました。";
            window.alert(w_msg);
            document.getElementById("textKey").value="";
            document.getElementById("textMemo").value=" ";
            } //version-up1 added
        }
        }, false
    );
};

function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
    function(e) {
        e.preventDefault();
        let w_confirm = window.confirm("LocalStorageのデータをすべて削除(all clear)します。\nよろしいでしょうか？");
        if (w_confirm === true) {
        localStorage.clear();
            viewStorage( );
        let w_msg = "LocalStorageのデータをすべて削除(all clear)しました ";
        window.alert(w_msg);
        document.getElementById("textKey").value="";
        document.getElementById("textMemo").value=" ";

        }
    }
    )
}

function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function(e) {
            e.preventDefault();
            selectCheckBox("select");//select data from table... version-up2 chg: selectRadioBtn ==> selectCheckBox
        }, false
);
};

function selectCheckBox(mode) {//version-up2 chg: selectRadioBtn ==> selectCheckBox // version-up3 chg 引数：なし==> mode
    //let w_sel = "0"; //選択されていれば、”1”にする // version-up3 del
    let w_cnt = 0; //version-up2 add
    const chkbox1 = document.getElementsByName("chkbox1");//version-up2 chg: selectRadioBtn ==> selectCheckBox
    const table1 = document.getElementById("table1");
    let w_textKey =""; //work verison-up2 added
    let w_textMemo =""; //work version-up2 added

    for(let i=0; i < chkbox1.length; i++) {//version-up2 chg: selectRadioBtn ==> selectCheckBox
        if(chkbox1[i].checked) {//version-up2 chg: selectRadioBtn ==> selectCheckBox
            if(w_cnt === 0){//version-up2 added
             w_textKey = table1.rows[i+1].cells[1].firstChild.data;//version-up2 chg
             w_textMemo = table1.rows[i+1].cells[2].firstChild.data;//version-up2 chg
             //return w_sel = "1"; version-up2 del
            }//version-up2 added
            w_cnt++; //version-up2 added
        }
    }

    document.getElementById("textKey").value=w_textKey;//version-up2 added
    document.getElementById("textMemo").value=w_textMemo;//version-up2 added

    if (mode === "select") {
        if(w_cnt === 1){//version-up2 added
            return w_cnt;//version-up2 added // version-up3 chg  w_sel = "1" ==> w_cnt
        }
        else{ //version-up2 added
            window.alert("Please select one");
        }
    } // version-up3 add

    if(mode === "del") { // version-up3 add
        if (w_cnt >= 1) { // version-up3 add
          return w_cnt;   // version-up3 add
        } // version-up3 add
        else { // version-up3 add
          window.alert("1つ選択（select）してください。"); // version-up3 add
        } // version-up3 add
      } // version-up3 add
    } // version-up3 add
    

function viewStorage( ){
    const list = document.getElementById("list");
    while(list.rows[0]) list.deleteRow(0);
    for (let i = 0 ; i < localStorage.length ; i++ ){
        let w_key = localStorage.key(i);
        
        let tr  = document.createElement ("tr");
        let td1 = document.createElement ("td");
        let td2 = document.createElement ("td");
        let td3 = document.createElement ("td");

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>"; // version-up2 chg
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }

    //jQueryのplugin tablesorterを使ってテーブルのソート
    //sortlist: 引数1…最初からソートしておく列を指定、引数2…0…昇順、1…降順
    $("#table1").tablesorter({
        sortList: [[1,0]]
    });

    $("#table1").trigger("update");
    
}