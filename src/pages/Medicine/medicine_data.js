const medicines = [
    {
        id: 0,
        number: "VD-21960-14",
        name: "Actadol 500",
        catelogue: ["Hệ thần kinh trung ương"],
        type: "Viên nén",
        packing: "Hộp 1 vỉ x 4 viên",
        expiry: "24 tháng",
        active_element: ["Paracetamol 500mg"],
        produce: "Công ty cổ phần dược Medipharco",
        price: "450đ/viên",
        quantity: "252 viên",
        img_url: "https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/00033763_actadol_500mg_medipharco_10x10_8398_624e_large_1af2cfcbfe.jpg",
        win_bid: [
            {
                date: "01/01/2024",
                price: "400đ/viên",
                quantity: "500 viên"
            }
        ]
    },
    {
        id: 1,
        number: "VD-22356",
        name: "Actadol Allerphart",
        catelogue: ["Kháng histamin", "Kháng dị ứng"],
        type: "Viên nén",
        packing: "Hộp 1 vỉ x 4 viên",
        expiry: "24 tháng",
        active_element: ["Fexofenadin HCl 180mg"],
        produce: "MEBIPHAR",
        price: "2.500đ/viên",
        quantity: "252 viên",
        img_url: "https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/00000614_allerphast_180mg_4471_6361_large_d69336d518.jpg",
        win_bid: [
            {
                date: "01/01/2024",
                price: "400đ/viên",
                quantity: "500 viên"
            }
        ]
    },
    {
        id: 2,
        number: "VD-24740-16",
        name: "A.t Zinc 10mg",
        catelogue: ["Chưa phân loại"],
        type: "Viên nén phân tán",
        packing: "Hộp 1 vỉ x 4 viên",
        expiry: "24 tháng",
        active_element: ["Kẽm"],
        produce: "Công ty cổ phần dược phẩm An Thiên",
        price: "500đ/viên",
        quantity: "252 viên",
        img_url: "https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/00031188_at_zinc_an_thien_10mg_10x10_8058_62ad_large_c409f297b6.jpg",
        win_bid: [
            {
                date: "01/01/2024",
                price: "400đ/viên",
                quantity: "500 viên"
            }
        ]
    },
    {
        id: 3,
        number: "VD-29690-18",
        name: "AtiLude 250mg/5ml",
        catelogue: ["Ho", "Cảm"],
        type: "Dung dịch uống",
        packing: "Hộp 1 vỉ x 4 viên",
        expiry: "24 tháng",
        active_element: ["Carbocisteine"],
        produce: "Công ty cổ phần dược phẩm An Thiên",
        price: "3.000đ/ống",
        quantity: "252 viên",
        img_url: "https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_04350_5dfca09de8.jpg",
        win_bid: [
            {
                date: "01/01/2024",
                price: "400đ/viên",
                quantity: "500 viên"
            }
        ]
    },
    {
        id: 4,
        number: "VD-26134-17",
        name: "Acefalgan 500mg Euvipharm",
        catelogue: ["Giảm đau", "Hạ sốt"],
        type: "Viên nén",
        packing: "Hộp 1 vỉ x 4 viên",
        expiry: "24 tháng",
        active_element: ["Paracetamol"],
        produce: "EUVIPHARM",
        price: "500đ/viên",
        quantity: "252 viên",
        img_url: "https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/00030190_acefalgan_500mg_euvipharm_10x10_1234_6061_large_3223000791.jpg",
        win_bid: [
            {
                date: "01/01/2024",
                price: "400đ/viên",
                quantity: "500 viên"
            }
        ]
    },
    {
        id: 5,
        number: "VD-19771-13",
        catelogue: ["Kháng viêm không steroid"],
        name: "Alphachymotrypsin Glomed Abbott",
        type: "Viên nén",
        packing: "Hộp 1 vỉ x 4 viên",
        expiry: "24 tháng",
        active_element: ["Chymotrypsin"],
        produce: "Công ty TNHH dược phẩm GLOMED",
        price: "3.000đ/viên",
        quantity: "252 viên",
        img_url: "https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/ALPHACHYMOTRYPSIN_GLOMED_4200_ABBOTT_2_X10_748d0c4890.jpg",
        win_bid: [
            {
                date: "01/01/2024",
                price: "400đ/viên",
                quantity: "500 viên"
            }
        ]
    },
    {
        id: 6,
        number: "VD-21876-14",
        name: "AmePrazol 40mg OPV",
        catelogue: ["Kháng acid", "Chống trào ngược", "Chống loét"],
        type: "Viên nang cứng",
        packing: "Hộp 1 vỉ x 4 viên",
        expiry: "24 tháng",
        active_element: ["Esomeprazol"],
        produce: "Công ty cổ phần dược phẩm OPV",
        price: "3.800đ/viên",
        quantity: "252 viên",
        img_url: "https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/2_381c4b2a73.png",
        win_bid: [
            {
                date: "01/01/2024",
                price: "400đ/viên",
                quantity: "500 viên"
            }
        ]
    },
    {
        id: 7,
        number: "VD-34739-20",
        name: "Auclanityl 500/62.5mg Tipharco",
        catelogue: ["Kháng sinh nhóm Pennicillin"],
        type: "Bột pha hỗn dịch uống",
        packing: "Hộp 1 vỉ x 4 viên",
        expiry: "24 tháng",
        active_element: ["Clavulanic", "Amoxicilina"],
        produce: "TIPHARCO",
        price: "4.200đ/gói",
        quantity: "252 viên",
        img_url: "https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/IMG_1309_9bba6ffb56.jpg",
        win_bid: [
            {
                date: "01/01/2024",
                price: "400đ/viên",
                quantity: "500 viên"
            }
        ]
    },
    {
        id: 8,
        number: "VD-23266-15",
        name: "Aciclovir 800mg Meyer",
        catelogue: ["Kháng virus"],
        type: "Viên nén",
        packing: "Hộp 1 vỉ x 4 viên",
        expiry: "24 tháng",
        active_element: ["Acyclivir"],
        produce: "MEYER - BPC",
        price: "5.400đ/viên",
        quantity: "252 viên",
        img_url: "https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/IMG_1436_96bfffd23e.jpg",
        win_bid: [
            {
                date: "01/01/2024",
                price: "400đ/viên",
                quantity: "500 viên"
            }
        ]
    },
    {
        id: 9,
        number: "VD-22395-15",
        name: "Biviantac BRV",
        catelogue: ["Trợ tiêu hóa"],
        type: "Hỗn dịch uống",
        packing: "Hộp 1 vỉ x 4 viên",
        expiry: "24 tháng",
        active_element: ["Magnesium hydroxide", "Nhôm hydroxyd", "Simethicone"],
        produce: "RELIV",
        price: "86.000đ/hộp",
        quantity: "252 viên",
        img_url: "https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/00018025_biviantac_khang_acid_bvp_20_goi_x_10ml_6598_63fd_large_0d42b28d3e.jpg",
        win_bid: [
            {
                date: "01/01/2024",
                price: "400đ/viên",
                quantity: "500 viên"
            }
        ]
    },
    {
        id: 10,
        number: "VD-25844-16",
        name: "Biotin 5mg Mediplantex",
        catelogue: ["Vitamin B", "Vitamin C"],
        type: "Viên nén",
        packing: "Hộp 1 vỉ x 4 viên",
        expiry: "24 tháng",
        active_element: ["Biotin"],
        produce: "MEDIPLANTEX",
        price: "900đ/viên",
        quantity: "252 viên",
        img_url: "https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/IMG_3041_6fa490252d.jpg",
        win_bid: [
            {
                date: "01/01/2024",
                price: "400đ/viên",
                quantity: "500 viên"
            }
        ]
    },
    {
        id: 11,
        number: "QLĐB-760-19",
        name: "BK-1 Stellapharm",
        catelogue: ["Ngừa thai"],
        type: "Viên nén",
        packing: "Hộp 1 vỉ x 4 viên",
        expiry: "24 tháng",
        active_element: ["Levonorgestrel"],
        produce: "STELLAPHARM",
        price: "75.000đ/viên",
        quantity: "252 viên",
        img_url: "https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/bk1_650f4d1628.jpg",
        win_bid: [
            {
                date: "01/01/2024",
                price: "400đ/viên",
                quantity: "500 viên"
            }
        ]
    },
    {
        id: 12,
        number: "VD-26977-17",
        name: "CalciMAX OPV",
        catelogue: ["Vitamin A", "Vitamin D", "Vitamin E"],
        type: "Dung dịch",
        packing: "Hộp 1 vỉ x 4 viên",
        expiry: "24 tháng",
        active_element: ["Lysine", "Calcium"],
        produce: "OPV",
        price: "7.500đ/ống",
        quantity: "252 viên",
        img_url: "https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_00180_bb9ca3ec86.jpg",
        win_bid: [
            {
                date: "01/01/2024",
                price: "400đ/viên",
                quantity: "500 viên"
            }
        ]
    },
    {
        id: 13,
        number: "VD-30231-18",
        name: "Dacolfort Danapha",
        catelogue: ["Trĩ", "Giãn tĩnh mạch"],
        type: "Viên nén bao phim",
        packing: "Hộp 1 vỉ x 4 viên",
        expiry: "24 tháng",
        active_element: ["Diosmin","Hesperidin"],
        produce: "DANAPHA",
        price: "2.600đ/viên",
        quantity: "252 viên",
        img_url: "https://cdn.nhathuoclongchau.com.vn/unsafe/636x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/00029275_dacolfort_500mg_danapha_3x10_6954_6062_large_fdad157540.jpg",
        win_bid: [
            {
                date: "01/01/2024",
                price: "400đ/viên",
                quantity: "500 viên"
            }
        ]
    }

];
export default medicines;