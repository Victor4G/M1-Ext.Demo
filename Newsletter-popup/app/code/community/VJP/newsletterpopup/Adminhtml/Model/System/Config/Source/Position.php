 <?php
/**
 * popup position options
 *
 */
class VJP_Newsletterpopup_Adminhtml_Model_System_Config_Source_Position
{
    /**
     * Options getter
     *
     * @return array
     */
    public function toOptionArray()
    {
        return array(
            array('value'=>'tl', 'label'=> 'Top Left'),
            array('value'=>'tc',  'label'=> 'Top Center'),
            array('value'=>'tr',  'label'=> 'Top Right'),
            array('value'=>'ml', 'label'=> 'Middle Left'),
            array('value'=>'mr',  'label'=> 'Middle Right'),
            array('value'=>'mc',  'label'=> 'Middle Center'),
            array('value'=>'bl', 'label'=> 'Bottom Left'),
            array('value'=>'bc',  'label'=> 'Bottom Center'),
            array('value'=>'br',  'label'=> 'Bottom Right'),
        );
    }

} 
