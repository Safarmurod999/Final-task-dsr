import Breadcrumb from "components/ui/Breadcrumb/Breadcrumb";
import {
    Form,
    FormRow,
    FormBtn,
    FormControl
} from "components/ui/Form/Form";
import { IoSaveSharp } from "react-icons/io5";
import useConnect from "./connect";
import { get } from "lodash";

const Page = () => {
    const {
        values,
        handleChange,
        handleSubmit,
    } = useConnect();

    return (
        <section className="user">
            <div className="admin-container">
                <Breadcrumb title="Todos Edit" backlink="/todos" />
                {
                    values ? (
                        <Form direction="y" width="50" onSubmit={handleSubmit}>
                            <FormRow>
                                <FormControl
                                    type="text"
                                    placeholder="Todo"
                                    label={"Title"}
                                    name="title"
                                    onChange={handleChange}
                                    value={get(values, "title", "")}
                                    required={true}
                                    width="50"
                                />
                                <FormControl
                                    type="text"
                                    placeholder="Do something"
                                    label={"Description"}
                                    name="description"
                                    onChange={handleChange}
                                    value={get(values, "description", "")}
                                    required={true}
                                    width="50"
                                />
                            </FormRow>
                            <FormBtn text="save" icon={<IoSaveSharp />} />
                        </Form>
                    ) : <Form>
                        <FormControl type="text" label="" value={"Loading..."} onChange={() => { }} />
                    </Form>
                }
            </div>
        </section>
    );
};

export default Page;
