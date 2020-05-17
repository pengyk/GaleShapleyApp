import React from 'react'
import { Segment, Header } from 'semantic-ui-react'


const Introduction = () => (
    <Segment>
        <Header as='h4' icon textAlign='center'>
            <Header.Content>
                We know that job hunting is hard. 
                We can apply everywhere, but the final decision is still up to the company.
                This page was created in the intent to entertain while learning a basic algorithm, the Gale-Shapley algorithm for stable matching.
                Hopefully this page will fulfill your dreams of landing a FANG company and help you make sure you know the GS algoritm well enough for you next exam.
                <br/>
                In this context, the applicants are the one making the proposals and applying for the jobs, therefore making them the proposers.
                (Of course, some you might get contacted by recruiter without applying, but don't flex on us).
                <br/>
                PS: it is important to note that, as you have probably learned in class, switching up such that the companies become the proposers also produces a stable matching.
                However, it might be different matching.
            </Header.Content>
        </Header>
    </Segment>
)

export default Introduction