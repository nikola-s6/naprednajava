import { useLogStateContext } from "@/context/log"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { Modal, Typography, useNotification } from "web3uikit"

export default function AddPatientRecordModal({ patient, reloadRecords }) {
  const [hospital, setHospital] = useState()
  const [diagnosis, setDiagnosis] = useState("")
  const [treatment, setTreatment] = useState("")
  const [medication, setMedication] = useState("")
  const [media, setMedia] = useState([])
  const [mediaDescription, setMediaDescription] = useState("")
  const [transactionWaiting, setTransactionWaiting] = useState(false)
  const inputRef = useRef()
  const [hospitals, setHospitals] = useState([])

  const { user, jwt } = useLogStateContext()

  const [modalOpen, setModalOpen] = useState(false)
  const toggleModal = function () {
    setModalOpen(!modalOpen)
  }

  const router = useRouter()
  const dispatch = useNotification()

  useEffect(() => {
    async function fetchHospitals() {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `http://localhost:8080/api/v1/employment/doctor/${user.id}`,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
      }
      axios(config)
        .then((response) => {
          let hsp = []
          response.data.forEach((element) => {
            hsp.push(element.hospital)
          })
          setHospitals(hsp)
          if (hsp.length > 0) setHospital(hsp[0])
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetchHospitals()
  }, [])

  const handleModalSubmit = async function (e) {
    e.preventDefault()
    toggleModal()
    setTransactionWaiting(true)

    // const data = new FormData()
    // data.append("patientId", patient.jmgb)
    // data.append("doctorId", user.id)
    // data.append("hospitalId", hospital)
    // data.append("diagnosis", diagnosis)
    // data.append("treatment", treatment)
    // data.append("medication", medication)
    // data.append("mediaDescription", mediaDescription)
    // data.append("media", media)

    // let hosp = hospitals.find((h) => h.id === hospital)

    const data = {
      patientId: patient.jmbg,
      doctorId: user.id,
      hospitalId: hospital,
      diagnosis: diagnosis,
      treatment: treatment,
      medication: medication,
      // mediaDescription: mediaDescription,
      // media: media,
    }

    // console.log(data)
    // return

    let config = {
      method: "post",
      // maxBodyLength: Infinity,
      url: "http://localhost:8080/api/v1/record/create",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    }

    axios
      .request(config)
      .then((response) => {
        dispatch({
          type: "success",
          message: "Record is successfully added",
          title: "Transaction complete",
          position: "bottomR",
          icon: "bell",
        })

        setTransactionWaiting(false)
        e.target.reset()

        reloadRecords()
      })
      .catch((error) => {
        console.log(error)
        dispatch({
          type: "error",
          message: "Record creation failed",
          title: "Error",
          position: "bottomR",
          icon: "bell",
        })
        setTransactionWaiting(false)
        e.target.reset()
      })
  }

  return (
    <>
      <div className="px-50 flex flex-col items-center">
        <button
          type="button"
          className="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={toggleModal}
        >
          Add patient record
        </button>
      </div>
      <div className="absolute top-0 left-0">
        <Modal
          cancelText="close"
          id="regular"
          isVisible={modalOpen}
          okText="Create"
          onCancel={function noRefCheck() {
            toggleModal()
          }}
          onCloseButtonPressed={function noRefCheck() {
            toggleModal()
          }}
          onOk={function noRefCheck() {
            let btn = document.getElementById("btnsbmt")
            btn.click()
          }}
          title={
            <div style={{ display: "flex", gap: 10 }}>
              <Typography color="#68738D" variant="h3">
                Create patient record
              </Typography>
            </div>
          }
        >
          <div
            style={{
              padding: "20px 0 20px 0",
            }}
          >
            <form onSubmit={handleModalSubmit} id="forma">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="patient"
                  id="patient"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  defaultValue={patient.firstName + patient.lastName}
                  disabled
                  readOnly
                />
                <label
                  htmlFor="patient"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Patient
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="doctor"
                  id="doctor"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  defaultValue={"Dr. " + user.firstName + " " + user.lastName}
                  disabled
                  readOnly
                />
                <label
                  htmlFor="doctor"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Doctor
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <select
                  id="hospital"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  onChange={(e) => setHospital(e.target.value)}
                  required
                >
                  {hospitals.map((hosp, key) => (
                    <option value={hosp.id} key={key} className="text-black">
                      {hosp.name}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="hospital"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Hospital
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <label
                  htmlFor="diagnosis"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Diagnosis
                </label>
                <textarea
                  id="dianosis"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write patient's diagnosis here..."
                  onChange={(e) => setDiagnosis(e.target.value)}
                ></textarea>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <label
                  htmlFor="treatment"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Treatment
                </label>
                <textarea
                  id="treatment"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write patient's treatment here..."
                  onChange={(e) => setTreatment(e.target.value)}
                ></textarea>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="medication"
                  id="medication"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={(e) => setMedication(e.target.value)}
                />
                <label
                  htmlFor="medication"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Medication
                </label>
              </div>

              {/* <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                htmlFor="metia"
              >
                Upload media files
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="media"
                type="file"
                ref={inputRef}
                multiple
                onChange={() => setMedia(inputRef.current.files)}
              />
              <div className="text-xs">{media.length} files uploaded!</div>
              <div className="relative z-0 w-full mb-6 group">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Media files description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write patient's treatment here..."
                  onChange={(e) => setMediaDescription(e.target.value)}
                ></textarea>
              </div> */}

              <button type="submit" id="btnsbmt" className="hidden" disabled={transactionWaiting}>
                hidden submit
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </>
  )
}
