import { useEffect, useState } from "react"
import { Tab, TabList } from "web3uikit"

export default function PatientRecords({ records }) {
  useEffect(() => {}, [records])

  const formatDate = function (date) {
    const dates = date.split("T")
    return dates[0]
  }

  return (
    <div className="flex flex-col justify-center mx-[15vw] my-20">
      <h1 className="text-xl mb-4">Patient records:</h1>
      <TabList isWidthAuto onChange={function noRefCheck() {}} tabStyle="bulbUnion">
        {records.map((record, index) => (
          <Tab tabKey={index + 1} tabName={"Record " + (index + 1)} key={index}>
            <div className="flex flex-col">
              <div className="mb-3">
                <h2 className="text-xl text-black">Hospital:</h2>
                <p>{record.hospital.name}</p>
              </div>
              <div className="mb-3">
                <h2 className="text-xl text-black">Doctor:</h2>
                <p>{`Dr. ${record.doctor.firstName} ${
                  record.doctor.lastName
                } (${record.doctor.specialization.toLowerCase()})`}</p>
              </div>
              <div className="mb-3">
                <h2 className="text-xl text-black">Date:</h2>
                <p>{formatDate(record.date)}</p>
              </div>
              <div className="mb-3">
                <h2 className="text-xl text-black">Diagnosis:</h2>
                <p>{record.diagnosis}</p>
              </div>
              <div className="mb-3">
                <h2 className="text-xl text-black">Treatment:</h2>
                <p>{record.treatment}</p>
              </div>
              <div className="mb-3">
                <h2 className="text-xl text-black">Medication:</h2>
                <p>{record.medication}</p>
              </div>
              {/* <div className="mb-3">
                <h2 className="text-xl text-black">Media description:</h2>
                <p>{record.mediaDescription ? record.mediaDescription : "none"}</p>
              </div>
              <div className="mb-3">
                <h2 className="text-xl text-black">Media links:</h2>
                <p>
                  {record.media.length ? (
                    record.media.map((link) => (
                      <a href={`http://localhost:8080/api/v1/image/${link.cid}`} target="_blank">
                        {link.fileName}
                      </a>
                    ))
                  ) : (
                    <>none</>
                  )}
                </p>
              </div> */}
            </div>
          </Tab>
        ))}
      </TabList>
    </div>
  )
}
