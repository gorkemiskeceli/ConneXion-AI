import { useState } from "react";
import { useDispatch } from "react-redux";
import SettingsSection from "../SettingsSection";
import FormField from "../../../../shared/components/ui/FormField";
import Input from "../../../../shared/components/ui/Input";
import { useToast } from "../../../../shared/components/ui/Toast";
import { updateUserProfile } from "../../../../homepage/store/authSlice";
import { service } from "../../../../services/service";

export default function ProfileSection({ currentUser }) {
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!email.trim() || !name.trim()) {
      showToast("Ad Soyad ve E-posta alanları boş bırakılamaz.", "error");
      return;
    }
    
    if (password && password !== confirmPassword) {
      showToast("Şifreler uyuşmuyor.", "error");
      return;
    }

    setIsSaving(true);
    try {
      // Update in our mock DB / localStorage via service
      await service.put(`/users/${currentUser.id}`, {
        id: currentUser.id,
        name,
        email,
        role: currentUser.role,
        tenantId: currentUser.tenantId,
        ...(password ? { password } : {})
      });

      // Update in Redux store
      dispatch(updateUserProfile({ name, email, password }));
      showToast("Profil bilgileriniz başarıyla güncellendi.", "success");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Profil güncelleme hatası:", error);
      showToast("Profil güncellenirken hata oluştu.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SettingsSection
      title="Profil Ayarları"
      description="Kişisel bilgilerinizi ve giriş kimliğinizi güncelleyin."
      canEdit={true}
      onSave={handleSave}
    >
      <div className="max-w-2xl space-y-5">
        <FormField label="Ad Soyad" htmlFor="profile-name">
          <Input 
            id="profile-name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Ad Soyad" 
          />
        </FormField>

        <FormField label="E-posta Adresi" htmlFor="profile-email">
          <Input 
            id="profile-email" 
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="ahmet@example.com" 
          />
        </FormField>

        <hr className="border-slate-100 my-6" />
        <h3 className="text-sm font-semibold text-slate-800">Şifre Değiştir (İsteğe Bağlı)</h3>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Yeni Şifre" htmlFor="profile-password">
            <Input 
              id="profile-password" 
              type="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
            />
          </FormField>

          <FormField label="Yeni Şifre Tekrar" htmlFor="profile-confirm-password">
            <Input 
              id="profile-confirm-password" 
              type="password"
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="••••••••" 
            />
          </FormField>
        </div>
      </div>
    </SettingsSection>
  );
}
