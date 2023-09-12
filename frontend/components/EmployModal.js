import { useEffect, useState } from "react"
import { Modal, Typography, useNotification } from "web3uikit"
import axios from "axios"
import { useLogStateContext } from "@/context/log"

export default function EmployModal({ doctor, reload }) {
  const [hospitals, setHospitals] = useState([])
  const [hospital, setHospital] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const { jwt } = useLogStateContext()
  const toggleModal = function () {
    setModalOpen(!modalOpen)
  }
  const dispatch = useNotification()

  useEffect(() => {
    async function fetchHospitals() {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:8080/api/v1/hospital",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
      }

      axios
        .request(config)
        .then((response) => {
          setHospitals(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    fetchHospitals()
  }, [])
  const handleModalSubmit = async function (e) {
    e.preventDefault()

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost:8080/api/v1/employment/doctor/${doctor.id}/hospital/${hospital}`,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
    }

    axios
      .request(config)
      .then((response) => {
        dispatch({
          type: "success",
          message: "Doctors employment successfuly created",
          title: "Transaction complete",
          position: "bottomR",
          icon: "bell",
        })
        reload()
      })
      .catch((error) => {
        console.log(error)
        dispatch({
          type: "error",
          message: "Error creating employment",
          title: "Error",
          position: "bottomR",
          icon: "bell",
        })
      })
    toggleModal()
  }

  return (
    <>
      {doctor ? (
        <button
          type="button"
          className="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={toggleModal}
        >
          Add employment
        </button>
      ) : (
        <></>
      )}

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
                Employ doctor:
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
              <button type="submit" id="btnsbmt" className="hidden">
                hidden submit
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </>
  )
}
