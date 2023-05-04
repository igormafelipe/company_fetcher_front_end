import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SyncLoader from 'react-spinners/SyncLoader';
import '../styles/form.css';

const Form = () => {
    const { register, handleSubmit, formState: { isValid } } = useForm();
    const bg_img = require('../assets/form_bg_chars.jpg');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const countryOptions = [
        { value: 'ca', label: 'Canada' },
        { value: 'ne', label: 'Netherlands' },
    ];

    const seniorityOptions = [
        { value: 'entry', label: 'Entry Level' },
        { value: 'junior', label: 'Mid Level' },
        { value: 'senior', label: 'Senior Level' },
    ];

    const positionTypeOptions = [
        { value: 'full time', label: 'Full Time' },
        { value: 'part time', label: 'Part Time' },
        { value: 'contract', label: 'Contract' },
        { value: 'temporary', label: 'Temporary' },
        { value: 'internship', label: 'Internship' },
        { value: 'volunteer', label: 'Volunteer' },
        { value: 'other', label: 'Other' },
    ];

    // Gets data. The value of data is an array
    const getData = async (data) => {
        setLoading(true);
        const keywords_exclude = [];
        
        for (let value of positionTypeOptions) {
            if (value.value !== data.position_type) {
                keywords_exclude.push(value.value);
            }
        }

        for (let value of seniorityOptions) {
            if (value.value !== data.seniority) {
                keywords_exclude.push(value.value);
            }
        }

        console.log(keywords_exclude)
        await axios({
        method: "GET",
        url: "http://igormafelipe.pythonanywhere.com/getjobs",
        params: {
            location: data.location,
            keywords_include: data.position,
            keywords_exclude: keywords_exclude.join(","),
        },
        })
        .then((response) => {
            const res = response.data;
            setLoading(false);
            navigate('results', { state: { data: res } })
        })
        .catch((error) => {
            if (error.response) {
            console.log(error.response);
            }
        });
    };

    return (
        <div class="body">
            {loading ? 
            
            <SyncLoader color="#15172b" />

            :
            
            <form onSubmit={handleSubmit(getData)} class="form" autocomplete="on">
                    <div class="title">Welcome</div>
                    <div class="subtitle">Let's find jobs that actually sponsor!</div>
                    <br/>
                    <label>
                        <p class="subtitle">Country</p>
                        <select {...register("location", { required: true })} class="input">
                            {countryOptions.map((option) => (
                                <option value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br/>
                    <label>
                        <p class="subtitle">Position</p>
                        <input {...register("position", { required: true })} 
                                class="input"
                                placeholder="Software Engineer"/>
                    </label>
                    <br/>
                    <label>
                        <p class="subtitle">Seniority</p>
                        <select {...register("seniority", { required: true })} class="input">
                            {seniorityOptions.map((option) => (
                                <option value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br/>
                    <label>
                        <p class="subtitle">Position Type</p>
                        <select {...register("position_type", { required: true })} class="input">
                            {positionTypeOptions.map((option) => (
                                <option value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <input type="submit" class={isValid ? "submit-active" : "submit"}/>
                </form>

            }
        </div>
    );
}

export default Form;