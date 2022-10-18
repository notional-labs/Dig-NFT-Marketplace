import { notification, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

notification.config({
    placement: 'bottomRight'
});

export const openNotification = (type, message) => {
    notification[type]({
        message,
        duration: 30000,
    });
};

export const openLoadingNotification = (cmd, message = '') => {
    if (cmd === 'open') {
        notification.open({
            key: 'updatable',
            message: (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'start',
                        color: '#EEC13F',
                        margin: 0
                    }}
                >
                    <Spin 
                        style={{
                            color: '#EEC13F',
                        }}
                        indicator={antIcon} 
                    />
                    <p
                        style={{
                            marginLeft: '20px',
                            marginBottom: 0
                        }}
                    >
                       {message}
                    </p>
                </div>
            ),
            duration: 0,

        });
    }
    else {
        notification.destroy()
    }
}