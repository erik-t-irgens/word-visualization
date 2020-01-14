import React from 'react';
import GallerySlide from './components/GallerySlide';
import GalleryButtons from './components/GalleryButton';

class ComponentGallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentSlide: 0,
            currentButton: 0,
            centerVisible: true,
            animationDirection: '',
        }
    }
    // Make sure to reset to 0, in case there are more or fewer slides in the next render
    componentDidMount = () => {
        this.setState({ currentSlide: 0, currentButton: 0 })
    }

    delay = (duration) => new Promise(resolve => setTimeout(resolve, duration));

    // Deals with hiding the current slide, then transitioning to the next slide. Only one slide is rendered at a time, but the animation being passed into the GallerySlide prop (as animationDirection from animationDirection in state) makes it seem like there is a true gallery with true slides.
    handleChangeCurrentSlide = async (value) => {
        // Hide current slide
        if (value === 'increment') {
            this.setState({
                animationDirection: 'slide right',
                centerVisible: false,
            })
        } else if (value === 'decrement') {
            this.setState({
                animationDirection: 'slide left',
                centerVisible: false,
            })
        }

        // This will ensure that the animation has time to render before setting the state to display the next slide.
        await this.delay(200)

        // Render next/prev slide
        if (value === 'increment' && this.state.currentSlide < this.props.data.length - 1) {
            this.setState({
                animationDirection: "slide left",
                currentSlide: (this.state.currentSlide + 1),
                centerVisible: true,
            })
        } else if (value === 'decrement' && this.state.currentSlide > 0) {
            this.setState({
                animationDirection: "slide right",
                currentSlide: (this.state.currentSlide - 1),
                centerVisible: true,
            })
        }
    }

    render() {
        const { data } = this.props
        const { currentSlide, centerVisible, animationDirection } = this.state
        return (
            <div style={{ overflow: 'hidden', width: '100%' }} >
                {data ?
                    <>
                        <GallerySlide

                            centerVisible={centerVisible}
                            animationDirection={animationDirection}
                            // // TODO This "component" should receive props from the NODE which is clicked to show what type of componnets will be rendered from that node. For now, hard coded.  
                            component={data[currentSlide]} />
                        <GalleryButtons
                            maxPage={data.length - 1 || 0}
                            currentPage={currentSlide}
                            functionality={this.handleChangeCurrentSlide}></GalleryButtons> </>
                    :
                    <>
                    </>
                }

            </div>
        )
    }

}

export default ComponentGallery;