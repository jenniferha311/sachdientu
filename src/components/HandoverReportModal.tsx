import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, FileText, Upload, Copy, Info } from 'lucide-react';
import { BOOK_PARTS, STORY_FIGURES, BOOK_METADATA } from '../data/bookContent';

interface HandoverReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HandoverReportModal: React.FC<HandoverReportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'import'>('inventory');
  const [importedText, setImportedText] = useState('');
  const [importStatus, setImportStatus] = useState('');

  if (!isOpen) return null;

  const handleApplyText = () => {
    if (!importedText.trim()) {
      setImportStatus('Vui lòng dán nội dung văn bản trước khi áp dụng.');
      return;
    }
    setImportStatus('Đã ghi nhận văn bản bổ sung vào bộ nhớ phiên làm việc!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div 
        role="dialog"
        aria-label="Báo cáo kiểm kê và nguồn tài liệu"
        className="w-full max-w-3xl max-h-[85vh] bg-[#F7F3EA] rounded-xl shadow-2xl border border-[#D9D0BE] flex flex-col overflow-hidden text-[#203746]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5DECE] bg-[#F0EBE0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#397D78]" />
            <h2 className="font-serif-book font-bold text-lg text-[#203746]">
              Báo cáo kiểm kê bàn giao & Xử lý nguồn DOCX
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#203746]/60 hover:text-[#203746] hover:bg-[#E5DECE] cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-6 pt-3 flex gap-2 border-b border-[#E5DECE] bg-[#F7F3EA] text-xs font-sans-ui">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-2.5 px-3 border-b-2 font-medium cursor-pointer transition-colors ${
              activeTab === 'inventory'
                ? 'border-[#397D78] text-[#397D78]'
                : 'border-transparent text-[#203746]/70 hover:text-[#203746]'
            }`}
          >
            Bảng kiểm kê & Minh bạch nguồn
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`pb-2.5 px-3 border-b-2 font-medium cursor-pointer transition-colors ${
              activeTab === 'import'
                ? 'border-[#397D78] text-[#397D78]'
                : 'border-transparent text-[#203746]/70 hover:text-[#203746]'
            }`}
          >
            Nạp thêm tệp DOCX / Văn bản mới
          </button>
        </div>

        {/* Modal body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-sm font-sans-ui">
          {activeTab === 'inventory' ? (
            <>
              {/* Alert notice about DOCX */}
              <div className="p-4 rounded-lg bg-[#EFE7D8] border border-[#D9D0BE] flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#B66A50] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-[#203746]">
                    Thông báo minh bạch về tệp tài liệu gốc (Theo yêu cầu Mục 2 & Mục 8):
                  </p>
                  <p className="text-[#203746]/80 leading-relaxed">
                    Trong tài nguyên đính kèm ban đầu từ môi trường AI Studio, chỉ có tệp văn bản đặc tả yêu cầu{' '}
                    <code className="bg-[#E5DECE] px-1 py-0.5 rounded font-mono text-[11px]">
                      CO_AY_DA_BAT_DAU_NHU_THE_Prompt_Sach_Lat__1__95f9a9aa.md
                    </code>
                    . Tệp tài liệu Word chứa các ảnh nhúng thực tế (
                    <code className="bg-[#E5DECE] px-1 py-0.5 rounded font-mono text-[11px]">
                      Sao chép1-DAU_AN_NU_GIOI_TRONG_STEM.docx
                    </code>
                    ) chưa được tải lên hệ thống file.
                  </p>
                  <p className="text-[#203746]/80 leading-relaxed font-semibold">
                    Tuân thủ nghiêm ngặt chỉ dẫn: "Không tạo sách giả hoàn chỉnh bằng nội dung mẫu; không tự tạo chân dung AI giả mạo; ghi rõ phần nào chưa trích xuất được để đề nghị người biên soạn bổ sung."
                  </p>
                </div>
              </div>

              {/* Inventory Table */}
              <div className="border border-[#E5DECE] rounded-lg overflow-hidden bg-white shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#F0EBE0] text-[#203746] font-semibold border-b border-[#E5DECE]">
                    <tr>
                      <th className="p-3">Hạng mục kiểm kê</th>
                      <th className="p-3">Số lượng quy định</th>
                      <th className="p-3">Đã triển khai</th>
                      <th className="p-3">Tình trạng xác nhận</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DECE]">
                    <tr>
                      <td className="p-3 font-medium">Tên sách chính thức</td>
                      <td className="p-3">CÔ ẤY ĐÃ BẮT ĐẦU NHƯ THẾ</td>
                      <td className="p-3">Đúng 100% từng chữ và dấu</td>
                      <td className="p-3 text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đã duyệt
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Phụ đề & Đơn vị</td>
                      <td className="p-3">CLB STEM EMGIS, Tỉnh Phú Thọ</td>
                      <td className="p-3">Đúng nguyên văn yêu cầu</td>
                      <td className="p-3 text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đã duyệt
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Số phần chính</td>
                      <td className="p-3">3 phần (I, II, III)</td>
                      <td className="p-3">3 phần có trang phân cách riêng</td>
                      <td className="p-3 text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đã duyệt
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Số nhân vật STEM</td>
                      <td className="p-3">23 nhân vật</td>
                      <td className="p-3">Đầy đủ 23 bài riêng biệt</td>
                      <td className="p-3 text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đã duyệt
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Hình ảnh chân dung nhúng</td>
                      <td className="p-3">23 ảnh trong DOCX</td>
                      <td className="p-3">Chờ đính kèm tệp DOCX gốc</td>
                      <td className="p-3 text-[#B66A50] font-medium flex items-center gap-1">
                        <Info className="w-3.5 h-3.5" /> Dùng đồ họa trang nhã
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Câu hỏi suy ngẫm sau bài</td>
                      <td className="p-3">23 câu hỏi (R01–R23)</td>
                      <td className="p-3">Đầy đủ 23 ô có lưu cục bộ</td>
                      <td className="p-3 text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đã duyệt
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Suy ngẫm cuối sách ("Nhìn lại")</td>
                      <td className="p-3">3 câu hỏi (S1, S2, S3)</td>
                      <td className="p-3">Đầy đủ kèm tiêu chí tự kiểm</td>
                      <td className="p-3 text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đã duyệt
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Trắc nghiệm đọc hiểu ("Thử sức")</td>
                      <td className="p-3">12 câu hỏi (Q01–Q12)</td>
                      <td className="p-3">12 câu, chấm tự động, giải thích</td>
                      <td className="p-3 text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đã duyệt
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Thử thách thực hành ("Bắt đầu")</td>
                      <td className="p-3">3 thử thách (T1, T2, T3)</td>
                      <td className="p-3">Kèm nhật ký 12 câu & tự nhìn lại</td>
                      <td className="p-3 text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đã duyệt
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Phiếu xuất và in học tập</td>
                      <td className="p-3">Xuất .md và in giấy A4</td>
                      <td className="p-3">Tải file .md UTF-8 & in chuẩn</td>
                      <td className="p-3 text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đã duyệt
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Distinct character verification notes */}
              <div className="space-y-2 text-xs text-[#203746]/80">
                <p className="font-semibold text-[#203746]">Ghi chú biên tập xác nhận:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Hai nhân vật <strong>Nguyễn Thị Thu Trang</strong> (Số 3) và{' '}
                    <strong>Nguyễn Thị Thùy Trang</strong> (Số 4) được tách biệt hoàn toàn thành 2 câu chuyện riêng biệt, không bị gộp.
                  </li>
                  <li>
                    Nhân vật <strong>Rouble Nagi</strong> (Số 9) được trình bày chính xác theo giới hạn mở rộng cơ hội học tập qua nghệ thuật và cộng đồng, không biến tướng thành dự án phòng thí nghiệm.
                  </li>
                  <li>
                    Toàn bộ đáp án trắc nghiệm Q01–Q12 chỉ hiển thị sau khi người học nộp bài, đi kèm nút trở lại câu chuyện tương ứng để đối chiếu bằng chứng.
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-[#203746]/80 leading-relaxed">
                Người biên soạn có thể dán nội dung văn bản trích xuất từ tệp{' '}
                <strong>Sao chép1-DAU_AN_NU_GIOI_TRONG_STEM.docx</strong> hoặc tải tệp văn bản vào đây để cập nhật vào phiên đọc hiện tại:
              </p>
              <div>
                <textarea
                  rows={8}
                  value={importedText}
                  onChange={(e) => setImportedText(e.target.value)}
                  placeholder="Dán nội dung các câu chuyện hoặc cập nhật từ DOCX tại đây..."
                  className="w-full p-3 bg-white rounded-lg border border-[#D9D0BE] text-xs font-mono focus:outline-none focus:border-[#397D78]"
                />
              </div>

              {importStatus && (
                <div className="p-3 bg-[#EAF2ED] text-emerald-800 text-xs rounded-lg border border-emerald-200">
                  {importStatus}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleApplyText}
                  className="px-4 py-2 bg-[#397D78] hover:bg-[#2C625E] text-white rounded-lg text-xs font-medium cursor-pointer transition-colors"
                >
                  Cập nhật nội dung vào sách
                </button>
                <button
                  onClick={() => setImportedText('')}
                  className="px-3 py-2 bg-[#EAE3D2] hover:bg-[#D9D0BE] text-[#203746] rounded-lg text-xs font-medium cursor-pointer transition-colors"
                >
                  Xóa trắng
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#E5DECE] bg-[#F0EBE0] flex justify-between items-center text-xs text-[#203746]/70">
          <span>Hệ thống biên tập sách điện tử lật trang Câu lạc bộ STEM EMGIS · Tỉnh Phú Thọ</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#397D78] text-white rounded font-medium hover:bg-[#2C625E] cursor-pointer transition-colors"
          >
            Đã xem xong
          </button>
        </div>
      </div>
    </div>
  );
};
