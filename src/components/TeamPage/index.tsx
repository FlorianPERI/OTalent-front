import './style.scss';

// from https://codepen.io/kristen17/pen/wvPebxy

function AboutPage() {
    return (
        <>
            <h3>Notre équipe</h3>
            <div className="team-container p-5">
                <div>
                    <div className="content">
                        <h4>Pierre Gamen</h4>
                        <span>Front Developper</span>
                    </div>
                </div>
                <div>
                    <div className="content">
                        <h4>William Commandeur</h4>
                        <span>Back Developper</span>
                    </div>
                </div>
                <div>
                    <div className="content">
                        <h4>Florian Peri</h4>
                        <span>Back Developper</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutPage;