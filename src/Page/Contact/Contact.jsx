import React from 'react'
import Title from '../../Components/Title/Title'
import ContactFrom from '../../Components/From-Design/ContactFrom'

const Contact = () => {
  return (
    <div>
        <Title text2={"Contact Us"} />

        <section>
            <ContactFrom></ContactFrom>
        </section>
    </div>
  )
}

export default Contact