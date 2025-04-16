import { Drawer, Button } from 'antd';
import _ from 'lodash';
import Image from 'next/image';

export function NotaryDrawer({ open, onClose, notary, onUpdate }) {
    if (_.isEmpty(notary)) return;

    const { name, ahu_number, sk_number, certificate_training, email, primary_phone, secondary_phone, office_telephone } = notary;
    const newNotary = {
        "Nama Notaris": name,
        "No. AHU": ahu_number,
        "No. SK": sk_number,
        "No. Sertifikat Pelatihan": certificate_training,
        "Email": email,
        "No. Telepon": office_telephone,
        "No. HP": primary_phone,
        "No. HP Lainnya": secondary_phone,
    };

    return (
        <Drawer
            title={
                <img src="/images/logo.png" className="h-10" alt="logo" />
            }
            placement="right"
            width={600}
            onClose={onClose}
            open={open}
            className="p-0"
            footer={null}
        >
            <div className="md:px-6 pt-4 flex flex-col justify-between min-h-full">
                <div className="bg-white rounded-xl border p-5 flex-1">
                    <h2 className="text-lg font-semibold mb-4">Informasi Notaris</h2>
        
                    <div className="grid grid-cols-1 gap-y-3 text-sm text-gray-800">
                        {_.isObject(newNotary) && Object.entries(newNotary).map(([key, value]) => (
                            <div key={key}>
                                <p className="text-gray-600">{key}</p>
                                <p className="font-medium text-wrap">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
    
                <Button
                    type="primary"
                    className="w-full bg-primary hover:bg-primary mt-6"
                    size="large"
                    onClick={onUpdate}
                >
                    Perbarui Data NPAK
                </Button>

                <div className="mt-6 text-center border-t pt-6 text-xs text-gray-500">
                    <img src="/images/logo-kemenkop.png" className="h-8 mx-auto mb-2" alt="Kemenkop Logo" />
                    <div className="flex justify-center gap-3 mb-2">
                        <img src="/images/facebook.png" className="h-5" alt="fb" />
                        <img src="/images/ig.png" className="h-5" alt="Instagram" />
                        <img src="/images/x.png" className="h-5" alt="Twitter" />
                    </div>
                    <p>Hakcipta © 2025. Kementerian Koperasi Republik Indonesia</p>
                </div>
            </div>
        </Drawer>
    )
}