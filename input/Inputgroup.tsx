import { useEffect, useState } from "react"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../config/database'
import { async } from "@firebase/util";
import styles from '../styles/Input.module.css'



// ------------------------------------------------------------------------------------------------------------

type InputType = {
  username: string,
  batchno: string,
  age: string,
  rollno: string
  id: string,
}
// ------------------------------------------------------------------------------------------------------------






const Inputgroup = () => {
  const [username, setusername] = useState<string>('')
  const [batchno, setbatchno] = useState<string>('')
  const [rollno, setrollno] = useState<string>('')
  const [age, setage] = useState<string>('')
  const [data, setdata] = useState<InputType[]>([])
  const [re, setre] = useState<string>('')
  const [toggle, settoggle] = useState(true)




  // ------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    onEditHandler();
    getdata();
  }, [])



  // ------------------------------------------------------------------------------------------------------------

  //  to import data into fairbase inputgroup
  const save = async () => {
    if (!username || !batchno || !rollno || !age) {
      alert("please enter all data");
    } else {
      try {
        const newinput = {
          username: username,
          batchno: batchno,
          age: age,
          rollno: rollno

        }
        const docRef1 = await addDoc(collection(db, "inputgroup"), newinput);
        setdata([...data, { ...newinput, id: docRef1.id }])
      }
      catch (e) {
        console.error(e);
      }
    }
    setusername('')
    setrollno('')
    setage('')
    setrollno('')
    setbatchno('')
  }

  //  to get data form fairbase inputgroup
  const getdata = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "inputgroup"));
      let datalist: InputType[] = []
      querySnapshot.forEach((doc) => {
        datalist.push({
          id: doc.id,
          username: doc.data().username,
          batchno: doc.data().batchno,
          age: doc.data().age,
          rollno: doc.data().rollno

        });
      });
      setdata(datalist);
    } catch (error) {
      console.log('================catch====================');
      console.log(error);
      console.log('====================================');
    } finally {

    }
  }
  // to delete the todo from firebase
  const cancel = async (item: InputType) => {
    try {
      await deleteDoc(doc(db, "inputgroup", item.id));
      let filtered = data.filter((e) => {
        if (item.id != e.id)
          return e
      })
      setdata(filtered)
    } catch (error) {
      console.log('================catch====================');
      console.log(error);
      console.log('====================================');
    }
  }






  // the update has started
  const update = (item: InputType) => {
    // storing id in state re and the description in input
    settoggle(false)
    setusername(item.username)
    setbatchno(item.batchno)
    setage(item.age)
    setrollno(item.rollno)
    setre(item.id)
  }

  const onEditHandler = async () => {
    try {
      await updateDoc(doc(db, "inputgroup", re), {
        username: username,
        batchno: batchno,
        age: age,
        rollno: rollno
      });
      let updatedItem = {
        username: username,
        batchno: batchno,
        age: age,
        rollno: rollno,
        id: re
      }
      let updatedTodos = data.map((todo) => {
        if (re == todo.id) {
          return updatedItem
        }
        else {
          return todo
        }
      })
      setdata(updatedTodos);
      settoggle(true);
      setusername('')
      setbatchno('')
      setage('')
      setrollno('')
    } catch (error) {
      console.log('================catch====================');
      console.log(error);
      console.log('====================================');
    }
  }






  // ------------------------------------------------------------------------------------------------------------

  // --------------------------------------------return started--------------------------------------------------
  return (
    <div >
      {/* form to fill out */}
      <div className={styles.centeraligin} >
        <div className={styles.card}>

          <div className={styles.form__group}>
            <input
              className={styles.form__field}
              onChange={(e) => { setusername(e.target.value) }}
              placeholder="Name"
              type="text"
              value={username} />
            <label className={styles.form__label}>Name</label>
          </div>

          <div className={styles.form__group}>
            <input
              className={styles.form__field}
              onChange={(e) => { setbatchno(e.target.value) }}
              placeholder="Batch NO"
              type="text"
              value={batchno} />
            <label className={styles.form__label}>Batch NO</label>
          </div>

          <div className={styles.form__group}>
            <input
              className={styles.form__field}
              onChange={(e) => { setrollno(e.target.value) }}
              placeholder="Roll no"
              type="text"
              value={rollno} />
            <label className={styles.form__label}>Roll no</label>
          </div>

          <div className={styles.form__group}>
            <input
              className={styles.form__field}
              onChange={(e) => { setage(e.target.value) }}
              placeholder="Age"
              type="text"
              value={age} />
            <label className={styles.form__label}>Age</label>
          </div>
          <br />

          <div className={styles.centerbutton}>
            {toggle ? <button onClick={save} className={styles.button1} >ENTER</button> :
              <button onClick={onEditHandler} className={styles.button2} >EDIT</button>
            }
          </div>
        </div>
      </div>
      < br />
      < br />
      {/* display data */}
      <div>
        


        {data.map((item) => {
          return (
            <div className={styles.centeraligin2}>
              <div className={styles.card12}>
                <table >
                  <tr>
                    <th className={styles.title}>Name</th>
                    <th className={styles.title}>Roll No</th>
                    <th className={styles.title2}>Batch No</th>
                    <th className={styles.title2}>Age</th>
                  </tr>
                  <tr>
                    <th>{item.username}</th>
                    <th>{item.rollno}</th>
                    <th>{item.batchno}</th>
                    <th>{item.age}</th>
                  </tr>
                </table>
                <br />
                <span className={styles.centerbutton}>
                  <button onClick={() => cancel(item)} className={styles.deletebutton}>
                    <span className={styles.shadow} ></span>
                    <span className={styles.edge} ></span>
                    <span className={styles.front} > delete
                    </span>
                  </button>
                  <button onClick={() => update(item)} className={styles.updatebutton}>
                    <span className={styles.shadow1} ></span>
                    <span className={styles.edge1} ></span>
                    <span className={styles.front1} > update
                    </span>
                  </button>
                </span>
              </div>
            </div>
          )
        })}
      </div>





    </div>
  )
}

export default Inputgroup