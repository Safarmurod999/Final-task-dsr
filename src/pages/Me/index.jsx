import React from 'react'
import useConnect from './connect'
import Breadcrumb from "components/ui/Breadcrumb/Breadcrumb";
import {
    Form,
    FormRow,
    FormBtn,
    FormControl
} from "components/ui/Form/Form";
import { get } from 'lodash';
const Me = () => {
    const { name, role } = useConnect();
    console.log("name", name);
    console.log("role", role);

    return (
        <section className="user">
            <div className="admin-container">
                <Breadcrumb title="My info" backlink="/admin/todos" />
                <Form direction="y" width="50" onSubmit={() => { }}>
                    <FormRow>
                        <FormControl
                            type="text"
                            placeholder="Name"
                            label={"Name"}
                            name="name"
                            onChange={() => { }}
                            value={name}
                            width="50"
                            
                        />
                        <FormControl
                            type="text"
                            placeholder="Role"
                            label={"Role"}
                            name="role"
                            onChange={() => { }}
                            value={role}
                            width="50"
                            
                        />
                    </FormRow>
                </Form>
            </div>
        </section>
    )
}

export default Me