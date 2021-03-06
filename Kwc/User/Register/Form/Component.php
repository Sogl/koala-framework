<?php
class Kwc_User_Register_Form_Component extends Kwc_Form_Component
{
    public static function getSettings()
    {
        $ret = parent::getSettings();
        $ret['placeholder']['submitButton'] = trlKwfStatic('create account');
        $ret['generators']['child']['component']['success'] = 'Kwc_User_Register_Form_Success_Component';
        $ret['standardRole'] = 'user';
        $ret['viewCache'] = false;
        $ret['plugins'] = array();
        return $ret;
    }

    protected function _beforeSave(Kwf_Model_Row_Interface $row)
    {
        parent::_beforeSave($row);
        $row->role = $this->_getSetting('standardRole');
    }

    protected function _initForm()
    {
        parent::_initForm();
        $this->_initUserForm();
    }

    protected function _initUserForm()
    {
        if (is_instance_of($this->getData()->parent->parent->componentClass, 'Kwc_User_Directory_Component')) {
            $detailClass = Kwc_Abstract::getChildComponentClass(
                        $this->getData()->parent->parent->componentClass, 'detail');
            $forms = Kwc_Abstract::getSetting($this->getData()->parent->componentClass, 'forms');
            $this->_form->addUserForms($detailClass, $forms);
        } else {
            $this->_form->add(new Kwc_User_Detail_General_Form('general', null));
        }
    }

    protected function _processInput($postData)
    {
        $postData[$this->getData()->componentId.'-post'] = true; //force processInput to be called (required for createUserRow call)
        parent::_processInput($postData);
    }
}
