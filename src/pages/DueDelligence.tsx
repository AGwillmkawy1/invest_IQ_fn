import { useAuthContext } from "../context/AuthContext.tsx";

import StartupDocs from "../components/collaboration/StartupDocs.tsx";
import useGetAllStartUps from "../hooks/collaboration/useGetAllStartUps.ts";
import {useState} from "react";
import ViewDiligence from "../components/collaboration/ViewDiligence.tsx";

export default function DueDelligence() {
  const { isInvestor } = useAuthContext();
  const { startUps, isLoading } = useGetAllStartUps();
  const [isVisible,setIsVisible]=useState(true)
  const [startupID,setStartUp]=useState<null|string>(null)

  function handleViewDil(currentID:string){
    setStartUp(currentID)
    setIsVisible(false)
  }

  function handleCloseVisibility(){
    setIsVisible(true)
  }

  return (
    <article className="px-12 py-8">
      <div className='flex justify-between'>
      <h1 className="text-3xl font-bold">Due Diligence</h1>
        <button className={`border py-2 px-7 bg-green-400 rounded-2xl hover:bg-green-700 font-bold ${!isVisible?'block':'hidden'}`} onClick={handleCloseVisibility}>Back</button>
      </div>
      {isInvestor && <StartupDocs />}
      <section className="flex gap-8 mt-8">
        {isVisible&&<div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Business Type</th>
              <th>Stage</th>
              <th>Location</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {isLoading && (
                <tr>
                  <th></th>
                  <td></td>
                  <td></td>
                  <td>
                    <span className="loading loading-bars loading-lg"></span>
                  </td>
                </tr>
            )}
            {!isLoading && (
                <>
                  {startUps.map((start_up, index) => (
                      <tr
                          key={start_up.id}
                          className={`${index % 2 !== 0 ? "text-white" : ""}`}
                      >
                        <th>{index}</th>
                        <td>{start_up.name}</td>
                        <td>{start_up.businessType}</td>
                        <td>{start_up.stage}</td>
                        <td>{start_up.location}</td>
                        <td>
                          <button className="btn btn-neutral" onClick={()=>{handleViewDil(start_up.id)}}>More</button>
                        </td>
                      </tr>
                  ))}
                </>
            )}
            </tbody>
          </table>
        </div>}
        {!isVisible && startupID && <ViewDiligence startupID={startupID}/>}
      </section>
    </article>
  );
}
