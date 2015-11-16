<?php

namespace XVEngine\Core\Component\Input;

use XVEngine\Core\Component\AbstractComponent;

/**
 * Class AbstractInputComponent
 * @author Krzysztof Bednarczyk
 * @package XVEngine\Core\Component\Input
 */
abstract class AbstractInputComponent  extends AbstractComponent {

    /**
     * @var string[]
     */
    private $validatorMessages = [];

    /**
     * @author Krzysztof Bednarczyk
     * @param string $label
     * @return $this
     */
    public function setLabel($label){
        $this->setParam('label', $label);
        return $this;
    }

    /**
     * @author Krzysztof Bednarczyk
     * @param string|mixed $value
     * @return $this
     */
    public function setValue($value){
        $this->setParam("value", $value);
        return $this;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @return string|mixed
     */
    public function getValue(){
        return $this->getParam("value");
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param bool|true $value
     * @return $this
     */
    public function setRequired($value = true){
        $this->setParam('required', $value);
        return $this;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param bool|true $value
     * @return $this
     */
    public function setHidden($value = true){
        $this->setParam('hidden', $value);
        return $this;
    }
    
    /**
     * 
     * @param string $value
     * @param string $message
     * @return $this
     */
    public function setValidatorMessage($value, $message){
        $this->validatorMessages[$value] = $message;
        return $this;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param bool|true $val
     * @return $this
     */
    public function disable($val = true){
        $this->setParam('disable', !!$val);
        return $this;
    }
    


    public function initialize() {
        $this->setLabel("");
        $this->setRequired(false);
        $this->setHidden(false);
        $this->setParamByRef("validatorMessages", $this->validatorMessages);
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param string $class
     * @return $this
     */
    public function addClass($class){
        $oldClasses = $this->getParam('classes');
        if(!$oldClasses){
            $oldClasses = "";
        }
        $this->setParam("classes",  "{$oldClasses} {$class}");
        return $this;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param string $name
     * @return $this
     */
    public function setName($name) {
        $this->setParam("name", $name);
        return $this;
    }

    /**
     * @author Krzysztof Bednarczyk
     * @param string $name
     * @return $this
     */
    public function setFocus($value) {
        $this->setParam("focus", $value);
        return $this;
    }
    
}
