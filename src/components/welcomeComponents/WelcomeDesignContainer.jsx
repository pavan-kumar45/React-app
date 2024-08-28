import ZoomOutAnimation from "@/wrappers/AnimationWrappers/ZoomOutAnimation";
// import "./welcomePage.css";
import style from './welcomePage.module.css'
import SlideUpAnimation from "@/wrappers/AnimationWrappers/SlideUpAnimation";

export default function WelcomeDesignContainer() {
  return (
    <>
      <div className={style['design-container']}>
        <div className={style['design-content']}>
          <div className={style['design-top']}>
          <SlideUpAnimation delay={0.1}>
              <h1>Hiregloo</h1>
            </SlideUpAnimation>
            <SlideUpAnimation delay={0.2}>
              <p>provides all necessary services for your career growth</p>
            </SlideUpAnimation>
          </div>
          <div className={style['design-bottom']}>
          <SlideUpAnimation delay={0.1}>
              <p>
                Find out the best platform that connects top-tier professionals
                with leading companies seeking your exepertise.
              </p>
            </SlideUpAnimation>
            <div className={style['hashtags']}>
              <div className={style['hashtag-group']}>
              <SlideUpAnimation delay={0.1}>
                  <div className={style['hashtag']}># Exclusive Opportunities</div>
                </SlideUpAnimation>

                <SlideUpAnimation delay={0.12}>
                  <div className={style['hashtag']}># AI Skill Validation</div>
                </SlideUpAnimation>

                <SlideUpAnimation delay={0.14}>
                  <div className={style['hashtag']}># Career Insights</div>
                </SlideUpAnimation>
              </div>
              <div className={style['hashtag-group']}>
              <SlideUpAnimation delay={0.16}>
                  <div className={style['hashtag']}># Hassle-Free Assignments</div>
                </SlideUpAnimation>

                <SlideUpAnimation delay={0.18}>
                  <div className={style['hashtag']}># Diverse Industry Options</div>
                </SlideUpAnimation>
              </div>
            </div>
           <ZoomOutAnimation delay={0.1}>
            <div className={style['thunder-image']}>
              <img src="../thunderbolt.png" alt="Thunder bolt image" />
            </div>
            </ZoomOutAnimation>
          </div>
        </div>
      </div>
    </>
  );
}
