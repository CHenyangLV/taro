import Nerv from 'nervjs'
import './style/index.scss'

class Video extends Nerv.Component {
  constructor () {
    super(...arguments)
  }
  componentDidMount () {
    this.bindevent()
  }

  bindevent () {
    this.video.addEventListener('timeupdate', (e) => {
      Object.defineProperty(e, 'detail', {
        enumerable: true,
        value: {
          duration: e.srcElement.duration,
          currentTime: e.srcElement.currentTime
        }
      })
      this.props.onTimeupdate(e)
    })

    this.video.addEventListener('ended', (e) => {
      this.props.onEnded(e)
    })

    this.video.addEventListener('play', (e) => {
      this.props.onPlay(e)
    })

    this.video.addEventListener('pause', (e) => {
      this.props.onPause(e)
    })

    // 网络错误
    this.video.addEventListener('error', (e) => {
      Object.defineProperty(e, 'detail', {
        enumerable: true,
        value: {errMsg: e.srcElement.error.code}
      })
      this.props.onError(e)
    })
  }

  render () {
    let {
      src,
      controls,
      autoplay,
      poster,
      initialTime,
      id,
      loop,
      muted
    } = this.props
    if (!controls) {
      poster = ''
    }
    return (
      <video
        id={id}
        src={src}
        controls={controls}
        autoplay={autoplay}
        poster={poster}
        start={initialTime}
        loop={loop}
        muted={muted}
        ref={(video) => { this.video = video }}>
        暂时不支持播放该视频
      </video>
    )
  }
}

// 默认配置
Video.defaultProps = {
  autoplay: false,
  controls: true,
  loop: false,
  muted: false
}

export default Video
