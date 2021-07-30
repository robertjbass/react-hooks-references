/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ReactElement, useState, useEffect } from "react"

import { LabeledInput, Loading } from "../components"
import { initialPerson } from "../utils"
import { usePerson } from "./usePerson"

export function PersonEditor(): ReactElement {
  const [person, setPerson] = usePerson(initialPerson)

  if (!person) {
    return <Loading />
  }

  return (
    <form
      className="person-editor"
      onSubmit={(e) => {
        e.preventDefault()
        alert(`Submitting\n${JSON.stringify(person, null, 2)}`)
      }}
    >
      <h2>Person Editor</h2>
      <LabeledInput
        label="Firstname:"
        value={person.firstname}
        onChange={(e) => {
          const newPerson = {
            ...person,
            firstname: e.target.value,
          }
          setPerson((person) => ({
            ...person!,
            firstname: e.target.value,
          }))

          if (newPerson.firstname === "Ford") {
            setPerson((person) => ({
              ...person!,
              surname: "Perfect",
              address: "Outer Space",
              email: "",
              phone: "",
            }))
          }
        }}
      />
      <LabeledInput
        label="Surname:"
        value={person.surname}
        onChange={(e) => {
          const newPerson = { ...person, surname: e.target.value }
          setPerson(newPerson)
        }}
      />
      <LabeledInput
        label="Email:"
        value={person.email}
        onChange={(e) => {
          const newPerson = { ...person, email: e.target.value }
          setPerson(newPerson)
        }}
      />
      <LabeledInput
        label="Address:"
        value={person.address}
        onChange={(e) => {
          const newPerson = { ...person, address: e.target.value }
          setPerson(newPerson)
        }}
      />
      <LabeledInput
        label="Phone:"
        value={person.phone}
        onChange={(e) => {
          const newPerson = { ...person, phone: e.target.value }
          setPerson(newPerson)
        }}
      />
      <hr />
      <div className="btn-group">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <hr />
      <pre>{JSON.stringify(person, null, 2)}</pre>
    </form>
  )
}
